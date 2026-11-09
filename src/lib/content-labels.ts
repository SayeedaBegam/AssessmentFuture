import type {
  AssessmentApproach,
  CatalogueClassification,
  EditorialReview,
  ResearchVerification,
} from "./types";
export const catalogueClassifications: {
  id: CatalogueClassification;
  label: string;
  description: string;
}[] = [
  {
    id: "programme-inventory",
    label: "Programme inventory",
    description:
      "Approaches identified in the supplied programme level inventory. This is not a complete or verified inventory of institutional practice.",
  },
  {
    id: "adaptation-combination",
    label: "Adaptations and combinations",
    description:
      "Variations or combinations with explicit links to established approaches. Their classification does not establish educational effectiveness.",
  },
  {
    id: "additional-emerging",
    label: "Additional and emerging possibilities",
    description:
      "Further possibilities for exploration. Inclusion here does not mean an approach is absent from UTN or another institution.",
  },
];
export const editorialReviewLabels: Record<EditorialReview["status"], string> =
  {
    draft: "Editorial prototype",
    "in-review": "Editorial review in progress",
    reviewed: "Editorially reviewed",
  };
export const researchVerificationLabels: Record<
  ResearchVerification["status"],
  string
> = {
  "not-reviewed": "Research review pending",
  "in-progress": "Research review in progress",
  reviewed: "Research review completed",
};
export function classificationLabel(id: CatalogueClassification) {
  return catalogueClassifications.find((c) => c.id === id)!.label;
}
export function evidenceAvailability(a: AssessmentApproach) {
  if (a.evidenceLinks.some((link) => link.directEvidence))
    return "Format specific source links";
  return a.evidenceLinks.length ? "Contextual literature" : "No linked sources";
}
