import { expect, test } from "@playwright/test";

test("static home assets, prefixed navigation and detail refresh work", async ({
  page,
}) => {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      response.url().startsWith("http://127.0.0.1:4173")
    ) {
      failures.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page
    .getByRole("link", { name: "Existing Assessments", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/AssessmentFuture\/explore\/$/);
  await expect(page.locator(".assessment-card")).toHaveCount(18);
  await page.goto("explore/collaborative-coding-assignments/");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Collaborative coding assignments",
  );
  await page
    .getByRole("link", { name: "Take this into the playground" })
    .click();
  await expect(
    page.getByRole("combobox", { name: "Assessment format", exact: true }),
  ).toHaveValue("collaborative-coding-assignments");
  expect(failures).toEqual([]);
});

test("comparison, AI choices and playground read shared query parameters", async ({
  page,
}) => {
  await page.goto("compare/?ids=practical-projects&ids=oral-examinations");
  await expect(page.locator(".comparison-selector select").nth(0)).toHaveValue(
    "practical-projects",
  );
  await expect(page.locator(".comparison-selector select").nth(1)).toHaveValue(
    "oral-examinations",
  );
  await page.goto("compare/?ids=practical-projects,oral-examinations");
  await expect(page.locator(".comparison-selector select").nth(1)).toHaveValue(
    "oral-examinations",
  );
  await page.goto("ai-integration/?ai=critical");
  await expect(page.getByRole("button", { pressed: true })).toContainText(
    "Critical",
  );
  await page.goto(
    "playground/?format=collaborative-coding-assignments&ai=critical",
  );
  await expect(
    page.getByRole("combobox", { name: "Assessment format", exact: true }),
  ).toHaveValue("collaborative-coding-assignments");
  await expect(
    page.getByRole("combobox", { name: "Working arrangement", exact: true }),
  ).toHaveValue("Collaborative");
});

test("static map keeps challenge and focus and hands off editable planning assumptions", async ({
  page,
}) => {
  await page.goto(
    "evidence-map/?challenge=individual-group-competency&focus=innovation:collaborative-individual-ml",
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
  await page.goto("workload/?implementation=dialogic-defence-robotics");
  await expect(
    page.getByLabel("Oral verification per student", { exact: true }),
  ).toHaveValue("5");
  await page.goto(
    "continuous-assessment/?implementation=dialogic-defence-robotics",
  );
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
});
