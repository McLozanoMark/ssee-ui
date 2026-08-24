import { sources } from "./data.js";

export const state = {
  filteredSources: [...sources],
  selectedIndex: null,
  editingIndex: null,
  pendingStatus: null,
  pendingAction: null,
  pendingCancel: false,
  openMenu: null,
  step: 1,
  sortKey: "id",
  sortDirection: "asc",
  draft: null,
  dirty: false,
  loadMode: "manual",
  manualRecords: [
    { code: "000123", dni: "71234567", name: "Juan Pérez López", date: "15/03/2012", sex: "Masculino", grade: "3° A", enrollment: "Matriculado" },
    { code: "000124", dni: "71234568", name: "María Fernández García", date: "22/07/2012", sex: "Femenino", grade: "3° A", enrollment: "Matriculado" }
  ]
};

export function createDraft(source = null) {
  state.draft = {
    id: source?.id || null,
    name: source?.name || "",
    description: source?.description || "",
    origin: source?.origin || "",
    originDetail: source?.originDetail || "",
    usage: source?.usage || [],
    status: source?.status || "Borrador",
    fields: source?.fields?.length ? source.fields.map((field) => ({ ...field })) : [
      { name: "Código modular", type: "Texto", required: true, description: "Código oficial de la unidad." },
      { name: "DNI del estudiante", type: "Texto", required: true, description: "Documento de identidad." },
      { name: "Nombres y apellidos", type: "Texto", required: true, description: "Nombre completo." }
    ],
    keyType: source?.keyFields?.length > 1 ? "compuesta" : "simple",
    keyFields: source?.keyFields?.length ? [...source.keyFields] : [],
    loadMode: "manual",
    fileName: "",
    records: source?.records || "0"
  };
  state.dirty = false;
}

export function resetWizard() {
  state.selectedIndex = null;
  state.editingIndex = null;
  state.pendingStatus = null;
  state.pendingAction = null;
  state.pendingCancel = false;
  state.step = 1;
  state.draft = null;
  state.dirty = false;
}
