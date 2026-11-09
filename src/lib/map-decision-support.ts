import { calculateWorkload } from "./logic";
import type { ImplementationPathway } from "./content-schema";
export function illustrativeCohortScenarios(p: ImplementationPathway) {
  const studentsPerGroup = p.workload.students / p.workload.groups;
  return [30, 60, 120].map((students) => {
    const groups = Math.min(students, Math.ceil(students / studentsPerGroup));
    return {
      students,
      groups,
      ...calculateWorkload({ ...p.workload, name: p.title, students, groups }),
    };
  });
}
export function researchConnectionLabel(
  connection: ImplementationPathway["researchConnections"][number],
) {
  if (connection.link.directEvidence) return "Direct research evidence";
  return connection.relation === "theoretically-informed-by"
    ? "Theoretical or conceptual support"
    : "Contextual research reading";
}
