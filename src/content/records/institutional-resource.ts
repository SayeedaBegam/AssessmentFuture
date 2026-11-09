import { z } from "zod";
import { institutionalResourceSchema } from "@/lib/content-schema";
export const institutionalResourceRecords: z.infer<
  typeof institutionalResourceSchema
>[] = [
  {
    id: "utn-workshop",
    title: "Assignments in the Era of AI workshop",
    url: "https://drive.google.com/file/d/13cm4gpUOsyCpD-CQYLl-4A5E_-AG3UDb/view",
    sourceType: "Workshop",
    access: "Access not verified",
    description:
      "User supplied workshop link. Contents and sharing permission have not been verified.",
    verificationNote:
      "Could not inspect the supplied page. No private material copied.",
  },
  {
    id: "utn-ai-manual",
    title: "UTN AI Teaching and Learning Manual",
    url: "https://www.utn.de/files/2026/04/2512_Manual_AI_In_TL.pdf",
    sourceType: "Institutional guidance",
    access: "Public document checked",
    description:
      "Public manual on AI in teaching and learning. Check the applicable version before use.",
    verificationNote:
      "Public PDF title and version inspected: internal version 22 April 2025, despite the 2026 upload path. This is not a compliance review.",
  },
  {
    id: "utn-aspo",
    title: "UTN ASPO",
    url: "https://www.utn.de/files/2026/09/260908_ASPO_L02_1.pdf",
    sourceType: "Institutional guidance",
    access: "Supplied link returned 404",
    description:
      "Supplied examination regulations link. Obtain the current official text before reviewing a design.",
    verificationNote:
      "The supplied URL returned 404 during checking. No regulatory provisions or compliance claims are reproduced.",
  },
  {
    id: "utn-teaching-hub",
    title: "Teaching Hub",
    url: "https://canvas.utn.de/courses/266",
    sourceType: "Teaching community",
    access: "Access not verified",
    description:
      "Institutional teaching space; access may require an authorised account.",
    verificationNote:
      "Contents not inspected. Authentication was not bypassed.",
  },
  {
    id: "utn-pruefen-ki",
    title: "Prüfen in einer Welt mit KI",
    url: "https://collab.dvb.bayern/spaces/UTNLEADINT/pages/2336581774/Pr%C3%BCfen+in+einer+Welt+mit+KI",
    sourceType: "Teaching community",
    access: "Access not verified",
    description:
      "User supplied institutional collaboration link, retained as a pointer only.",
    verificationNote:
      "Contents and access permissions not verified. No private document republished.",
  },
  {
    id: "kharbach-assessment",
    title: "Med Kharbach: AI Assessment",
    url: "https://medkharbach.com/category/ai-assessment/",
    sourceType: "Practitioner commentary",
    access: "Public page checked",
    description:
      "Practitioner reading collection. Follow citations to the original studies.",
    verificationNote:
      "Public category page checked. Commentary is not treated as peer reviewed evidence.",
  },
  {
    id: "academic-cloud",
    title: "Academic Cloud",
    url: "https://academiccloud.de/",
    sourceType: "Service provider",
    access: "Public page checked",
    description:
      "Academic service information. Local access, privacy approval and costs need checking.",
    verificationNote:
      "Public homepage checked. No service integration or institution specific entitlement is claimed.",
  },
  {
    id: "onetutor",
    title: "OneTutor",
    url: "https://onetutor.ai/de-de",
    sourceType: "Service provider",
    access: "Public page checked",
    description:
      "Provider information about an AI teaching tool. Listing is not endorsement or evidence of effectiveness.",
    verificationNote:
      "Public provider page checked. No paid service, account or API is required by this application.",
  },
].map((r) => ({
  ...r,
  checkedOn: "2026-11-03",
  editorialReview: {
    status: "draft",
    note: "Link and source type recorded; institutional and editorial approval pending.",
  },
})) as z.infer<typeof institutionalResourceSchema>[];
