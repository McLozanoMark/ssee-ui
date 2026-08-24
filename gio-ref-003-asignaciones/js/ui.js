import { renderToast, enableTooltips } from "../../design-system/interaction.js";
export const refs = { assignmentsBody: document.getElementById("assignmentsBody"), emptyState: document.getElementById("emptyState"), pageSummary: document.getElementById("pageSummary"), assignmentCount: document.getElementById("assignmentCount"), toast: document.getElementById("toast"), assignmentModal: document.getElementById("assignmentModal"), assignmentTitle: document.getElementById("assignmentTitle"), assignmentContext: document.getElementById("assignmentContext"), assignmentInstrument: document.getElementById("assignmentInstrument"), assignmentUser: document.getElementById("assignmentUser"), assignmentSample: document.getElementById("assignmentSample"), assignmentStart: document.getElementById("assignmentStart"), assignmentEnd: document.getElementById("assignmentEnd"), assignmentSaveBtn: document.getElementById("assignmentSaveBtn") };
document.querySelectorAll(".location-card strong").forEach((node) => { node.textContent = "Sede"; });
document.querySelectorAll(".account-copy strong").forEach((node) => { node.textContent = "Administrador"; });

export function showToast(first, second, third) {
  const hasElement = first && first.nodeType === 1;
  return renderToast(hasElement ? first : refs.toast, hasElement ? second : first, hasElement ? third : second);
}
export { enableTooltips };
