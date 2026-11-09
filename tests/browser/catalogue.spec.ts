import { expect, test } from "@playwright/test";
import { assessments } from "../../src/content/assessments";

test("catalogue classification and review filters remain independent", async ({
  page,
}) => {
  await page.goto("/explore");
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const emergingCount = assessments.filter(
    (a) => a.catalogueClassification === "additional-emerging",
  ).length;
  const reviewedInventoryCount = assessments.filter(
    (a) =>
      a.catalogueClassification === "programme-inventory" &&
      a.editorialReview.status === "reviewed",
  ).length;
  const pendingInventoryCount = assessments.filter(
    (a) =>
      a.catalogueClassification === "programme-inventory" &&
      a.researchVerification.status === "not-reviewed",
  ).length;
  await expect(
    dialog.getByLabel("Catalogue classification").locator("option"),
  ).toHaveCount(4);
  await dialog
    .getByLabel("Catalogue classification")
    .selectOption("additional-emerging");
  await dialog
    .getByRole("button", { name: `Show ${emergingCount} approaches` })
    .click();
  await expect(page.locator(".assessment-card")).toHaveCount(emergingCount);
  if (emergingCount === 0) {
    await expect(
      page.getByText(
        "No records have been added to this catalogue classification yet.",
        { exact: false },
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "This does not mean these approaches are absent from UTN or another institution.",
        { exact: false },
      ),
    ).toBeVisible();
  }
  await page.getByRole("button", { name: /Filters 1/ }).click();
  await dialog
    .getByLabel("Catalogue classification")
    .selectOption("programme-inventory");
  await dialog
    .getByRole("combobox", { name: "Editorial review", exact: true })
    .selectOption("reviewed");
  await dialog
    .getByRole("button", { name: `Show ${reviewedInventoryCount} approaches` })
    .click();
  await expect(page.locator(".assessment-card")).toHaveCount(
    reviewedInventoryCount,
  );
  await page.getByRole("button", { name: /Filters 2/ }).click();
  await dialog
    .getByRole("combobox", { name: "Editorial review", exact: true })
    .selectOption("");
  await dialog
    .getByRole("combobox", { name: "Research verification", exact: true })
    .selectOption("not-reviewed");
  await dialog
    .getByRole("button", { name: `Show ${pendingInventoryCount} approaches` })
    .click();
  await expect(page.locator(".assessment-card")).toHaveCount(
    pendingInventoryCount,
  );
  await expect(page.locator(".active-filters")).toContainText(
    "Programme inventory",
  );
  await expect(page.locator(".active-filters")).toContainText(
    "Research review pending",
  );
});

test("legacy detail URLs keep distinct statuses and operational tool links", async ({
  page,
}) => {
  await page.goto("/explore/collaborative-coding-assignments");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Collaborative coding assignments",
  );
  await expect(page.locator(".detail-tags")).toContainText(
    "Programme inventory",
  );
  await expect(page.locator(".detail-tags")).toContainText(
    "Editorial prototype",
  );
  await expect(page.locator(".detail-tags")).toContainText(
    "Research review pending",
  );
  await expect(
    page.getByRole("link", { name: "Add to comparison" }),
  ).toHaveAttribute("href", "/compare?ids=collaborative-coding-assignments");
  await page
    .getByRole("link", { name: "Take this into the playground" })
    .click();
  await expect(
    page.getByRole("combobox", { name: "Assessment format", exact: true }),
  ).toHaveValue("collaborative-coding-assignments");
  await expect(page.getByLabel("Working arrangement")).toHaveValue(
    "Collaborative",
  );
  await expect(
    page.getByRole("checkbox", { name: "Collaboration", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Explore this possibility" }).click();
  await expect(page.locator("#design-result h2")).toHaveText(
    "Collaborative coding assignments",
  );
});

test("curated knowledge map links still resolve through stable assessment IDs", async ({
  page,
}) => {
  await page.goto("/knowledge-map");
  await page
    .getByRole("button", { name: "Approach Peer review", exact: true })
    .click();
  await expect(page.locator(".map-inspector h2")).toHaveText("Peer review");
  await page
    .locator(".map-inspector")
    .getByRole("link", { name: "Open exploration" })
    .click();
  await expect(page).toHaveURL(/\/explore\/peer-review$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Peer review",
  );
  await expect(page.locator(".detail-tags")).toContainText(
    "Research review pending",
  );
});
