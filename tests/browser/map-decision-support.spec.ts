import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { catalogue } from "../../src/content/catalogue";
test("challenge entry point narrows the existing pathway and shows a respectful comparison", async ({
  page,
}) => {
  await page.goto(
    "/evidence-map?challenge=individual-group-competency&focus=innovation:collaborative-individual-ml",
  );
  await expect(
    page.getByRole("combobox", {
      name: "Assessment challenge (optional)",
      exact: true,
    }),
  ).toHaveValue("individual-group-competency");
  const panel = page.getByRole("region", { name: "Lecturer decision support" });
  await expect(
    panel.getByRole("heading", {
      level: 2,
      name: "Collaborative Project with Individual Evidence",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    panel.getByRole("heading", { name: "Existing approach", exact: true }),
  ).toBeVisible();
  await expect(
    panel.getByRole("heading", { name: "Proposed adaptation", exact: true }),
  ).toBeVisible();
  await expect(panel.getByText(/may already address progress/)).toBeVisible();
  await page
    .getByRole("combobox", { name: "Assessment method", exact: true })
    .selectOption("paper-critiques-and-summaries");
  await expect(
    page.getByText("No items match these filters.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset map filters" }).click();
  await expect(
    page.getByRole("combobox", {
      name: "Assessment challenge (optional)",
      exact: true,
    }),
  ).toHaveValue("");
});
test("semester, evidence and feasibility panels expose real content and planning downloads", async ({
  page,
}) => {
  await page.goto("/evidence-map?focus=innovation:dialogic-defence-robotics");
  const panel = page.getByRole("region", { name: "Lecturer decision support" });
  await panel.getByText("Research and guidance", { exact: true }).click();
  await expect(
    panel.getByText("Contextual research reading", { exact: true }),
  ).toBeVisible();
  await expect(
    panel
      .getByRole("link", { name: "Original publication", exact: false })
      .first(),
  ).toHaveAttribute("href", /s41239-026-00627-4/);
  await expect(
    panel.getByText("Evidence limitations", { exact: true }),
  ).toBeVisible();
  await panel.getByText("Semester implementation", { exact: true }).click();
  await expect(
    panel.getByRole("heading", {
      name: "Individual competency evidence and verification",
    }),
  ).toBeVisible();
  await expect(
    panel.getByText(/Five minute individual discussion/).first(),
  ).toBeVisible();
  await panel
    .getByText("Feasibility, workload and access", { exact: true })
    .click();
  await expect(
    panel.getByRole("region", {
      name: "Illustrative cohort workload scenarios",
    }),
  ).toBeVisible();
  await expect(
    panel.getByRole("heading", { name: "Data protection questions" }),
  ).toBeVisible();
  await expect(
    panel.getByText(/ASPO review: Required before use/),
  ).toBeVisible();
  await panel.getByRole("link", { name: "Edit workload assumptions" }).click();
  await expect(
    page.getByLabel("Oral verification per student", { exact: true }),
  ).toHaveValue("5");
  await page.goto("/evidence-map?focus=innovation:dialogic-defence-robotics");
  const panel2 = page.getByRole("region", {
    name: "Lecturer decision support",
  });
  await panel2.getByText("Semester implementation", { exact: true }).click();
  await panel2
    .getByRole("link", { name: "Adapt this semester sequence" })
    .click();
  await page
    .getByLabel("Week for Five minute individual discussion", { exact: true })
    .fill("12");
  const pending = page.waitForEvent("download");
  await page.getByRole("link", { name: "Export pathway" }).click();
  expect(await readFile((await (await pending).path())!, "utf8")).toContain(
    "Week 12: Five minute individual discussion",
  );
});
test("every innovation keeps its comparison and three applications in map details", async ({
  page,
}) => {
  for (const p of catalogue.implementations) {
    await page.goto(`/evidence-map?focus=innovation:${p.id}`);
    const panel = page.getByRole("region", {
      name: "Lecturer decision support",
    });
    await expect(
      panel.getByRole("heading", { level: 2, name: p.title, exact: true }),
    ).toBeVisible();
    await expect(
      panel.getByText(p.decisionSupport.proposedChanges, { exact: true }),
    ).toBeVisible();
    await panel.getByText("Discipline applications", { exact: true }).click();
    await expect(panel.locator(".application-card")).toHaveCount(3);
  }
});
test("expanded map decision panels remain responsive, keyboard accessible and readable in both themes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/evidence-map?focus=innovation:ai-feedback-verification");
  const panel = page.getByRole("region", { name: "Lecturer decision support" });
  const summary = panel
    .locator("summary")
    .filter({ hasText: "Feasibility, workload and access" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(
    panel.getByRole("heading", { name: "Data protection questions" }),
  ).toBeVisible();
  await panel.getByText("Research and guidance", { exact: true }).click();
  for (const dark of [false, true]) {
    if (dark)
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
  await page.screenshot({
    path: "test-results/map-decision-mobile-dark.png",
    fullPage: true,
  });
});
