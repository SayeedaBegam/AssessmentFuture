import { expect, test } from "@playwright/test";
import { catalogue } from "../../src/content/catalogue";
import AxeBuilder from "@axe-core/playwright";
test("expanded readings expose source scope and pending summaries", async ({
  page,
}) => {
  await page.goto("/research/rethinking-assessment-generative-ai");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Rethinking Educational Assessment",
  );
  await expect(page.getByText("Review scope: metadata only")).toBeVisible();
  await page.getByRole("tab", { name: "Detailed research digest" }).click();
  await expect(
    page.getByText("Pending verification. No findings summary is published."),
  ).toBeVisible();
});
test("implementation handoffs initialise editable workload, timeline, comparison and AI choices", async ({
  page,
}) => {
  const base = "/implementations/short-dialogic-defence-robotics";
  await page.goto(base);
  await page
    .getByRole("navigation", { name: "Implementation tools" })
    .getByRole("link", { name: "Workload Calculator" })
    .click();
  await expect(
    page.getByRole("spinbutton", {
      name: "Oral verification per student",
      exact: true,
    }),
  ).toHaveValue("5");
  await expect(
    page.getByRole("spinbutton", { name: "Number of students", exact: true }),
  ).toHaveValue("30");
  await page
    .getByRole("spinbutton", { name: "Number of students", exact: true })
    .fill("40");
  await expect(
    page.getByRole("spinbutton", { name: "Number of students", exact: true }),
  ).toHaveValue("40");
  await page.goto(base);
  await page
    .getByRole("navigation", { name: "Implementation tools" })
    .getByRole("link", { name: "Semester Timeline" })
    .click();
  await expect(
    page.getByLabel("Week for Five minute individual discussion", {
      exact: true,
    }),
  ).toHaveValue("11");
  await page
    .getByLabel("Week for Five minute individual discussion", { exact: true })
    .fill("12");
  await expect(
    page.getByLabel("Week for Five minute individual discussion", {
      exact: true,
    }),
  ).toHaveValue("12");
  await page.goto(base);
  await page
    .getByRole("navigation", { name: "Implementation tools" })
    .getByRole("link", { name: "Comparison Studio" })
    .click();
  await expect(page).toHaveURL(/ids=practical-projects,oral-examinations/);
  await page.goto("/ai-integration?ai=critical");
  await expect(page.getByRole("button", { pressed: true })).toContainText(
    "Critical",
  );
});
test("evidence map supports focus, combined filters, keyboard selection and a complete text alternative", async ({
  page,
}) => {
  await page.goto(
    "/evidence-map?focus=implementation-pathway:assessment-twins-ml",
  );
  const inspector = page.getByRole("region", {
    name: "Selected evidence item",
  });
  await expect(
    inspector.getByRole("heading", { name: "Assessment Twins", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Focus on an item", exact: true })
    .selectOption("competency:reasoning");
  await expect(
    inspector.getByRole("heading", { name: "Critical reasoning", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Course context", exact: true })
    .selectOption("robotics");
  await page
    .getByRole("combobox", { name: "Assessment method", exact: true })
    .selectOption("oral-examinations");
  await page
    .getByRole("combobox", { name: "Relationship type", exact: true })
    .selectOption("implements-approach");
  await expect(page.getByRole("status")).toHaveText(
    "3 items and 2 relationships match these filters.",
  );
  await page
    .getByRole("combobox", { name: "Focus on an item", exact: true })
    .selectOption("implementation-pathway:dialogic-defence-robotics");
  const node = page
    .locator(".evidence-node")
    .filter({ hasText: "Oral examinations" });
  await node.focus();
  await page.keyboard.press("Enter");
  await expect(
    inspector.getByRole("heading", { name: "Oral examinations", exact: true }),
  ).toBeVisible();
  await page
    .getByText("Show complete relationship list (2)", { exact: true })
    .click();
  await expect(
    page
      .getByText(
        "Source: Explicit references in implementation-pathway:dialogic-defence-robotics; editorial mapping, not measured student data.",
      )
      .first(),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Course context", exact: true })
    .selectOption("human-and-ai");
  await expect(
    page.getByText("No items match these filters.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset map filters" }).click();
  await expect(
    page.getByRole("combobox", { name: "Course context", exact: true }),
  ).toHaveValue("");
});
test("new pages remain accessible and fit a narrow viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    ...catalogue.implementations.map((p) => `/implementations/${p.slug}`),
    "/evidence-map?focus=implementation-pathway:ai-output-auditing",
    "/resources",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.screenshot({
    path: "test-results/resources-mobile.png",
    fullPage: true,
  });
  await page.goto("/implementations/assessment-twins-machine-learning");
  await page.screenshot({
    path: "test-results/implementation-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/implementation-desktop.png",
    fullPage: true,
  });
  await page.goto(
    "/evidence-map?focus=implementation-pathway:assessment-twins-ml",
  );
  await page.screenshot({
    path: "test-results/evidence-map-desktop.png",
    fullPage: true,
  });
});
test("all eight implementation pages show complete sections and real approach links", async ({
  page,
}) => {
  for (const p of catalogue.implementations) {
    await page.goto(`/implementations/${p.slug}`);
    await expect(
      page.getByRole("heading", { level: 1, name: p.title }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Research and evidence status",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Accessibility, fairness and limits",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Fictional teaching material",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Implementation tools" })
        .getByRole("link"),
    ).toHaveCount(8);
    await expect(
      page
        .getByText("ASPO review: Required before use.", { exact: false })
        .first(),
    ).toBeVisible();
  }
  await page.goto("/explore/practical-projects");
  await page
    .getByRole("link", {
      name: "Short Dialogic Defence Proposed implementation",
    })
    .click();
  await expect(page).toHaveURL(/short-dialogic-defence-robotics/);
});
test("resources expose failed and restricted source checks without copying documents", async ({
  page,
}) => {
  await page.goto("/resources");
  await expect(
    page.getByRole("heading", { name: "UTN ASPO", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Supplied link returned 404", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Access not verified", { exact: true }),
  ).toHaveCount(3);
});
