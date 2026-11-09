import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
test("new research and framework views remain accessible in the dark theme", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  for (const route of [
    "/implementations",
    "/implementations/assessment-twins-machine-learning",
    "/evidence-map?focus=innovation:assessment-twins-ml",
    "/research",
  ]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  await page.goto("/evidence-map?focus=innovation:assessment-twins-ml");
  await page.screenshot({
    path: "test-results/redesign-map-dark.png",
    fullPage: true,
  });
});
test("academic homepage, primary navigation and local fonts work across themes and mobile", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Rethinking Assessment in the Age of AI",
  );
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }).getByRole("link"),
  ).toHaveCount(5);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.locator("h1").evaluate((e) => getComputedStyle(e).fontFamily),
  ).toMatch(/manrope/i);
  await page.screenshot({
    path: "test-results/redesign-home-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({
    path: "test-results/redesign-home-dark.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "New Ideas & Innovations", exact: true })
    .click();
  await expect(page).toHaveURL(/implementations$/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test("complete research to adaptation journey retains source limits and exports edited planning data", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore New Ideas", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Assessment Twins", exact: true })
    .getByRole("link")
    .click();
  await page
    .locator("#practice-8")
    .getByRole("link", {
      name: "Assessment Twins: A Protocol for AI-Vulnerable Summative Assessment",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("Review scope: abstract", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "View this source in the research map" })
    .click();
  const pathway = page.getByRole("region", {
    name: "Six stage research pathway",
  });
  await expect(pathway.locator(".pathway-column-heading")).toHaveCount(6);
  const adapt = pathway
    .locator(".evidence-node")
    .filter({ hasText: "Adapt Assessment Twins to your teaching" });
  await adapt.focus();
  await page.keyboard.press("Enter");
  await page
    .getByRole("navigation", { name: "Map adaptation tools" })
    .getByRole("link", { name: "Semester Timeline" })
    .click();
  const week = page.getByLabel("Week for Agree evaluation criteria", {
    exact: true,
  });
  await expect(week).toHaveValue("2");
  await week.fill("3");
  const pending = page.waitForEvent("download");
  await page.getByRole("link", { name: "Export pathway" }).click();
  const download = await pending;
  expect(await readFile((await download.path())!, "utf8")).toContain(
    "Week 3: Agree evaluation criteria",
  );
});
test("research map competency filters, text alternative and responsive pathways remain accessible", async ({
  page,
}) => {
  await page.goto("/evidence-map?focus=innovation:ai-output-auditing");
  await page
    .getByRole("combobox", { name: "Competency", exact: true })
    .selectOption("mathematics");
  await page
    .getByRole("combobox", { name: "Focus on an item", exact: true })
    .selectOption("implementation-application:audit-mathematics");
  await expect(
    page.getByRole("region", { name: "Selected evidence item" }),
  ).toContainText("Audit a generated proof");
  await page.getByText(/Show complete relationship list/).click();
  await expect(
    page.getByRole("heading", { name: "Complete accessible text alternative" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  const violations = (
    await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze()
  ).violations;
  expect(violations).toEqual([]);
  await page.getByText(/Show complete relationship list/).click();
  await page.screenshot({
    path: "test-results/redesign-map-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/evidence-map?focus=innovation:assessment-twins-ml");
  await page.screenshot({
    path: "test-results/redesign-map-desktop.png",
    fullPage: true,
  });
});
test("innovation discovery filters disciplines and exposes the general lecturer framework", async ({
  page,
}) => {
  await page.goto("/implementations");
  await expect(page.locator(".innovation-card")).toHaveCount(8);
  await page
    .getByRole("combobox", { name: "Technical discipline" })
    .selectOption("Mathematics");
  await expect(page.locator(".innovation-card")).toHaveCount(3);
  await page
    .getByRole("textbox", { name: "Search innovation frameworks" })
    .fill("Twins");
  await expect(
    page.getByRole("heading", { name: "No frameworks match these filters." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset innovation filters" }).click();
  await page
    .getByRole("heading", { name: "Assessment Twins", exact: true })
    .getByRole("link")
    .click();
  await expect(
    page.getByRole("heading", {
      name: "A practical sequence for lecturers",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".application-card")).toHaveCount(3);
  await expect(page.locator(".application-card").first()).toContainText(
    "Programming and Computer Science",
  );
  await expect(page.locator("#worked-example")).toContainText(
    "Machine Learning",
  );
});
