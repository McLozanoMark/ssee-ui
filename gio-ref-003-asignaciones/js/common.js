import { closeConfirmModal, openConfirmModal, renderToast } from "../../design-system/interaction.js";

export function qs(selector, root = document) { return root.querySelector(selector); }
export function escapeHtml(value) { return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }
export function getParam(name) { return new URLSearchParams(window.location.search).get(name) || ""; }
export function linkTo(path, params = {}) { const query = new URLSearchParams(params).toString(); return query ? `${path}?${query}` : path; }
export function showToast(message, type = "info") { const element = qs("#toast"); if (element) renderToast(element, message, type); }

function bindConfirmDismissal(modal) {
  if (!modal || modal.dataset.confirmDismissBound) return;
  modal.addEventListener("click", (event) => {
    const dismissControl = event.target.closest?.("[data-bs-dismiss='modal']");
    if (!dismissControl) return;
    event.preventDefault();
    event.stopPropagation();
    closeConfirm();
  }, true);
  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeConfirm();
  }, true);
  modal.dataset.confirmDismissBound = "true";
}

export function openConfirm(message) {
  const modal = qs("#confirmModal");
  const legacyMessage = qs("#confirmMessage");
  if (legacyMessage) legacyMessage.textContent = message;
  bindConfirmDismissal(modal);
  const instance = openConfirmModal("confirmModal", message);
  if (!instance && modal) {
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
    modal.dataset.fallbackModal = "true";
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    document.body.classList.add("modal-open");
  }
  return instance;
}
export function closeConfirm() {
  const modal = qs("#confirmModal");
  if (window.bootstrap) closeConfirmModal("confirmModal");
  if (modal) {
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    delete modal.dataset.fallbackModal;
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
  }
}

export function downloadCsv(filename, headers, rows) {
  const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\r\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadExcel(filename, headers, rows) {
  const escapeXml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
  const cell = (value, header = false) => `<Cell${header ? " ss:StyleID=\"Header\"" : ""}><Data ss:Type=\"String\">${escapeXml(value)}</Data></Cell>`;
  const workbook = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Font ss:Bold="1"/></Style></Styles><Worksheet ss:Name="Datos"><Table><Row>${headers.map((header) => cell(header, true)).join("")}</Row>${rows.map((row) => `<Row>${row.map((value) => cell(value)).join("")}</Row>`).join("")}</Table></Worksheet></Workbook>`;
  const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
