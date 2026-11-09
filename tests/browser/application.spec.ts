import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { assessments } from "../../src/content/assessments";

test("reduced-motion pages hydrate without console errors or movement", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/workload", "/playground"]) {
    await page.goto(route);
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(page.locator(".motion-surface").first()).toHaveCSS(
      "transform",
      "none",
    );
  }
  expect(errors).toEqual([]);
});

test("home, explorer filters, accessible dialog, and detail navigation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Assessment",
  );
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page
    .getByRole("link", { name: "Explore assessment approaches", exact: true })
    .click();
  await expect(
    page.getByText(`${assessments.length} approaches to explore`),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search assessment approaches" })
    .fill("coding");
  await expect(page.locator(".assessment-card")).toHaveCount(6);
  await page
    .getByRole("textbox", { name: "Search assessment approaches" })
    .fill("");
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Working arrangement").selectOption("Collaborative");
  await dialog
    .getByLabel("Technical resources")
    .selectOption("Computing environment");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Filters 2" })).toBeFocused();
  await expect(page.locator(".assessment-card")).toHaveCount(3);
  await page.locator(".card-main-link").first().click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Collaborative coding assignments",
  );
  await expect(
    page.getByRole("heading", { name: "Trace the connection." }),
  ).toBeVisible();
});

test("research search and reading depths retain pending evidence boundaries", async ({
  page,
}) => {
  await page.goto("/research");
  await page.getByRole("textbox", { name: "Search research" }).fill("Nicol");
  await expect(page.locator(".paper-card")).toHaveCount(1);
  await page.locator(".paper-card").click();
  await page.getByRole("tab", { name: "Detailed research digest" }).click();
  await expect(
    page.getByText("No findings are summarized here before full text review."),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /DOI:/ })).toHaveAttribute(
    "href",
    "https://doi.org/10.1080/03075070600572090",
  );
  await page.getByRole("tab", { name: "Detailed research digest" }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("tab", { name: "2 minute explanation" }),
  ).toBeFocused();
});

test("comparison and rule-based design outline use actual selections", async ({
  page,
}) => {
  await page.goto("/compare");
  await page.getByRole("button", { name: /Try coding assignments/ }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(
    page
      .getByRole("columnheader")
      .filter({ hasText: "Portfolios & staged assessment" }),
  ).toBeVisible();
  await page.goto("/playground");
  await page.getByLabel("Number of students").fill("60");
  await page.getByLabel("Working arrangement").selectOption("Collaborative");
  await page.getByRole("button", { name: "Explore this possibility" }).click();
  await expect(page.locator("#design-result")).toContainText(
    "15 groups of up to four",
  );
  await expect(page.locator("#design-result")).toContainText(
    "40.0 minutes per group",
  );
  await page.getByLabel("Number of students").fill("30");
  await expect(
    page.getByText("Your inputs have changed.", { exact: false }),
  ).toBeVisible();
});

test("workload calculations and snapshots update the chart and table", async ({
  page,
}) => {
  await page.goto("/workload");
  await expect(page.locator(".total-number")).toContainText("28.0");
  await page
    .getByRole("button", { name: "Keep scenario for comparison" })
    .click();
  await page.getByLabel("Marking unit").selectOption("group");
  await expect(page.locator(".total-number")).toContainText("8.0");
  await page
    .getByRole("spinbutton", {
      name: "Oral verification per student",
      exact: true,
    })
    .fill("10");
  await expect(page.locator(".total-number")).toContainText("13.0");
  await expect(
    page.getByRole("row").filter({ hasText: "Scenario 1" }),
  ).toContainText("28.0");
  await expect(
    page.getByRole("row").filter({ hasText: "Your scenario" }),
  ).toContainText("13.0");
});

test("semester stages, spectrum, and knowledge connections respond", async ({
  page,
}) => {
  await page.goto("/continuous-assessment");
  await expect(page.locator(".timeline-stage")).toHaveCount(7);
  await page.getByRole("button", { name: "Add stage", exact: true }).click();
  await expect(page.locator(".timeline-stage")).toHaveCount(8);
  await page
    .getByLabel("Purpose for Problem formulation")
    .selectOption("graded");
  await page.getByLabel("Weight for Problem formulation").fill("10");
  await expect(
    page.getByText("Your graded stages total 110%.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove Formative feedback" }).click();
  await expect(page.locator(".timeline-stage")).toHaveCount(7);
  await page.goto("/ai-integration");
  await page.getByRole("button", { name: /Critical evaluation/ }).click();
  await expect(page.locator(".spectrum-detail h2")).toHaveText(
    "Critical evaluation",
  );
  await page.goto("/knowledge-map");
  await page.getByRole("button", { name: "Research UNESCO guidance" }).click();
  await expect(page.locator(".map-inspector h2")).toHaveText("UNESCO guidance");
  await expect(page.locator(".map-connections")).toContainText(
    "Contextual policy framing",
  );
  await page.getByRole("button", { name: "List", exact: true }).click();
  await expect(page.locator(".knowledge-list")).toBeVisible();
});

test("theme, mobile navigation, responsive layout, and reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.screenshot({ path: "test-results/home-dark.png", fullPage: true });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Research & Resources", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Evidence worth exploring.",
  );
  for (const route of [
    "/",
    "/explore",
    "/compare",
    "/playground",
    "/workload",
    "/continuous-assessment",
    "/knowledge-map",
    "/programmes",
    "/about",
    "/explore/individual-coding-assignments",
  ]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `No horizontal page overflow on ${route}`,
    ).toBe(true);
  }
  await page.goto("/");
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
});

test("automated WCAG checks across representative routes", async ({ page }) => {
  const violations = [];
  for (const route of [
    "/",
    "/explore",
    "/explore/individual-coding-assignments",
    "/research/guidance-generative-ai",
    "/playground",
    "/workload",
    "/continuous-assessment",
    "/knowledge-map",
    "/ai-integration",
    "/programmes",
    "/about",
  ]) {
    await page.goto(route);
    await page.getByRole("heading", { level: 1 }).waitFor();
    await page.emulateMedia({ reducedMotion: "reduce" });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    for (const v of result.violations)
      violations.push({
        route,
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      });
  }
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});

test("dark theme accessibility, keyboard skip link, and live interface screenshots", async ({
  page,
}) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({ path: "test-results/home-viewport.png" });
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  const violations = [];
  for (const route of [
    "/",
    "/explore/individual-coding-assignments",
    "/workload",
    "/continuous-assessment",
    "/programmes",
  ]) {
    await page.goto(route);
    await page.getByRole("heading", { level: 1 }).waitFor();
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    for (const v of r.violations)
      violations.push({
        route,
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      });
  }
  await page.goto("/workload");
  await page.screenshot({
    path: "test-results/workload-desktop.png",
    fullPage: true,
  });
  await page.goto("/knowledge-map");
  await page.screenshot({
    path: "test-results/knowledge-map-desktop.png",
    fullPage: true,
  });
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});
