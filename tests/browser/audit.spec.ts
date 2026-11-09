import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { assessments } from "../../src/content/assessments";
import { papers } from "../../src/content/research";
import { knowledgeNodes } from "../../src/content/knowledge";

test("audit: competency search uses the names lecturers see", async ({
  page,
}) => {
  await page.goto("/explore");
  await page
    .getByRole("textbox", { name: "Search assessment approaches" })
    .fill("Critical reasoning");
  await expect(page.locator(".assessment-card").first()).toBeVisible();
});

test("audit: research search tolerates surrounding whitespace", async ({
  page,
}) => {
  await page.goto("/research");
  await page
    .getByRole("textbox", { name: "Search research" })
    .fill("   Nicol   ");
  await expect(page.locator(".paper-card")).toHaveCount(1);
});

test("audit: timeline week edits always remain visible and duplicate stages have unique controls", async ({
  page,
}) => {
  await page.goto("/continuous-assessment");
  await page
    .getByLabel("Week for Problem formulation", { exact: true })
    .fill("2.5");
  await expect(
    page.getByLabel("Week for Problem formulation", { exact: true }),
  ).toHaveValue("2");
  await expect(
    page
      .locator(".semester-track")
      .getByRole("link", { name: "Problem formulation", exact: true }),
  ).toBeVisible();
  await page.getByLabel("Stage to add").selectOption("Peer review");
  await page.getByRole("button", { name: "Add stage", exact: true }).click();
  await expect(
    page.getByLabel("Week for Peer review, stage 3", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Week for Peer review, stage 8", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "Move Problem formulation later in list",
      exact: true,
    })
    .click();
  await expect(page.getByLabel("Stage 2 name", { exact: true })).toHaveValue(
    "Problem formulation",
  );
  await expect(
    page.getByLabel("Week for Problem formulation", { exact: true }),
  ).toHaveValue("2");
  await expect(
    page.getByText("The list order differs from the week order.", {
      exact: false,
    }),
  ).toBeVisible();
});

test("audit: AI selection carries into the linked playground", async ({
  page,
}) => {
  await page.goto("/ai-integration");
  await page.getByRole("button", { name: /Critical evaluation/ }).click();
  await page
    .getByRole("link", { name: "Explore a design with this in mind" })
    .click();
  await expect(page.getByLabel("Desired AI integration")).toHaveValue(
    "Critical evaluation",
  );
});

test("audit: repeated comparison parameters cannot crash a page", async ({
  page,
}) => {
  const response = await page.goto(
    "/compare?ids=individual-coding-assignments&ids=peer-review",
  );
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "How do the options compare?",
  );
});

test("audit: catalogue routes, source routes, and missing pages return the expected status", async ({
  request,
}) => {
  for (const assessment of assessments)
    expect(
      (await request.get(`/explore/${assessment.slug}`)).status(),
      assessment.slug,
    ).toBe(200);
  for (const paper of papers)
    expect(
      (await request.get(`/research/${paper.slug}`)).status(),
      paper.slug,
    ).toBe(200);
  for (const route of [
    "/explore/not-in-the-collection",
    "/research/not-in-the-collection",
    "/missing-page",
  ])
    expect((await request.get(route)).status(), route).toBe(404);
});

test("audit: comparison limits, downloads, and workload counts reflect current state", async ({
  page,
}) => {
  await page.goto("/explore");
  const cards = page.locator(".assessment-card");
  for (let i = 0; i < 3; i++)
    await cards
      .nth(i)
      .getByRole("button", { name: /Compare/ })
      .click();
  await expect(
    cards.nth(3).getByRole("button", { name: /Compare/ }),
  ).toBeDisabled();
  await cards
    .nth(0)
    .getByRole("button", { name: /Compare/ })
    .click();
  await expect(
    cards.nth(3).getByRole("button", { name: /Compare/ }),
  ).toBeEnabled();
  await page.goto("/explore/individual-coding-assignments");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: /Competency evidence rubric/ }).click();
  const download = await downloadPromise;
  expect(await readFile((await download.path())!, "utf8")).toContain(
    "ILLUSTRATIVE TEMPLATE",
  );
  await page.goto("/continuous-assessment");
  await page
    .getByLabel("Week for Problem formulation", { exact: true })
    .fill("3");
  const timelineDownload = page.waitForEvent("download");
  await page.getByRole("link", { name: "Export pathway" }).click();
  const exported = await timelineDownload;
  expect(await readFile((await exported.path())!, "utf8")).toContain(
    "Week 3: Problem formulation",
  );
  await page.goto("/workload");
  await page.getByLabel("Number of students", { exact: true }).fill("30.5");
  await expect(
    page.getByLabel("Number of students", { exact: true }),
  ).toHaveValue("30");
});

test("audit: map and list can select every structured node", async ({
  page,
}) => {
  await page.goto("/knowledge-map");
  for (const node of knowledgeNodes) {
    await page
      .locator(".knowledge-canvas")
      .getByRole("button", { name: `${node.kind} ${node.label}`, exact: true })
      .click();
    await expect(page.locator(".map-inspector h2")).toHaveText(node.label);
  }
  await page.getByRole("button", { name: "List", exact: true }).click();
  for (const node of knowledgeNodes) {
    await page
      .locator(".knowledge-list")
      .getByRole("button", { name: node.label, exact: true })
      .click();
    await expect(page.locator(".map-inspector h2")).toHaveText(node.label);
  }
});

test("audit: keyboard controls and interactive states remain accessible", async ({
  page,
}) => {
  await page.goto("/research/guidance-generative-ai");
  await page.getByRole("tab", { name: "30 second overview" }).focus();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "Detailed research digest" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("tabpanel")).toBeFocused();
  await page.goto("/explore");
  await expect(
    page
      .getByRole("navigation")
      .getByRole("link", { name: "Existing Assessments" }),
  ).toHaveAttribute("aria-current", "page");
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Existing Assessments" })
    .focus();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.goto("/playground?format=collaborative-coding-assignments");
  await expect(page.getByLabel("Working arrangement")).toHaveValue(
    "Collaborative",
  );
  await page.getByRole("button", { name: "Explore this possibility" }).click();
  await expect(page.locator("#design-result")).toBeFocused();
  await expect(page.locator("#design-result")).not.toHaveCSS(
    "outline-style",
    "none",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("audit: narrow and tablet layouts contain page overflow", async ({
  page,
}) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/explore",
      "/research",
      "/compare?ids=individual-coding-assignments,peer-review,oral-examinations",
      "/workload",
      "/continuous-assessment",
      "/knowledge-map",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width}px ${route}`,
      ).toBe(true);
    }
    await page.screenshot({
      path: `test-results/audit-map-${width}.png`,
      fullPage: true,
    });
  }
});
