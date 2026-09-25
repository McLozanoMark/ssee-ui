const STORAGE_KEY = "ssee-rf-dis-001-state-v3";
const AUDIT_DATE = "24/09/2026";

export const users = [
  { id: "AP1041044", name: "María López Pérez", active: true, canReceiveAssignments: true },
  { id: "AP2056789", name: "Juan Carlos Ramírez", active: true, canReceiveAssignments: true },
  { id: "AP3098765", name: "Ana Lucía Torres", active: true, canReceiveAssignments: true },
  { id: "AP4123456", name: "Pedro Miguel Silva", active: true, canReceiveAssignments: true },
  { id: "AP5234567", name: "Rosa Elena Vargas", active: true, canReceiveAssignments: true },
  { id: "AP6345678", name: "Luis Alberto Quispe", active: true, canReceiveAssignments: true },
];

export const projects = [
  { name: "IIE PRIVADAS", instruments: ["Ficha de seguimiento", "Supervisión a Instituciones Educativas Privadas - Aspectos Económicos", "Supervisión a Instituciones Educativas Privadas - Aspectos Legales"] },
  { name: "Instituciones educativas", instruments: ["Instrumento de evaluación", "Lista de verificación"] },
];

export const samples = [
  { name: "Muestra nacional 2026", total: 100, source: "Censo Educativo MINEDU", userField: "COD_USUARIO", userId: "AP1041044", projects: ["IIE PRIVADAS", "Instituciones educativas"], instruments: ["Ficha de seguimiento", "Instrumento de evaluación"] },
  { name: "Muestra de directores", total: 420, source: "Directores registrados", userField: "COD_USUARIO", userId: "AP2056789", projects: ["IIE PRIVADAS"], instruments: ["Ficha de seguimiento", "Supervisión a Instituciones Educativas Privadas - Aspectos Económicos"] },
  { name: "Piloto operativo", total: 80, source: "Operativo piloto", userField: "COD_USUARIO", userId: "AP3098765", projects: ["Instituciones educativas"], instruments: ["Instrumento de evaluación", "Lista de verificación"] },
];

const initialAssignments = [
  { id: "ASN-001", unitId: "150001", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP1041044", sample: "Muestra nacional 2026", start: "18/08/2026", end: "18/09/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000001", recordCount: 100 },
  { id: "ASN-002", unitId: "150002", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Supervisión a Instituciones Educativas Privadas - Aspectos Económicos", userId: "AP2056789", sample: "Muestra de directores", start: "15/08/2026", end: "15/09/2026", progress: "42%", progressGroup: "En curso", status: "En proceso", dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000002", recordCount: 420 },
  { id: "ASN-003", unitId: "150003", project: "Instituciones educativas", mode: "with-sample", instrument: "Lista de verificación", userId: "AP3098765", sample: "Piloto operativo", start: "01/08/2026", end: "12/08/2026", progress: "100%", progressGroup: "Completado", status: "Finalizada", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000003", recordCount: 80 },
  { id: "ASN-004", unitId: "150004", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP4123456", sample: "Muestra histórica 2025", start: "05/08/2026", end: "30/08/2026", progress: "25%", progressGroup: "En curso", status: "Reasignada", active: false, dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000004", recordCount: 100 },
  { id: "ASN-005", unitId: "150005", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP5234567", sample: "Muestra anulada", start: "20/07/2026", end: "20/08/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Anulada", active: false, dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000005", recordCount: 100 },
  { id: "ASN-006", unitId: "150006", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP6345678", sample: "Muestra nacional 2026", start: "19/08/2026", end: "19/09/2026", progress: "10%", progressGroup: "En curso", status: "En proceso", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000006", recordCount: 100 },
  { id: "ASN-007", unitId: "150007", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP1041044", sample: "Muestra de directores", start: "20/08/2026", end: "20/09/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000007", recordCount: 420 },
  { id: "ASN-008", unitId: "150008", project: "Instituciones educativas", mode: "with-sample", instrument: "Lista de verificación", userId: "AP2056789", sample: "Piloto operativo", start: "22/08/2026", end: "22/09/2026", progress: "65%", progressGroup: "En curso", status: "En proceso", dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000008", recordCount: 80 },
  { id: "ASN-009", unitId: "150009", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP3098765", sample: "Muestra nacional 2026", start: "22/08/2026", end: "22/09/2026", progress: "100%", progressGroup: "Completado", status: "Finalizada", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000009", recordCount: 100 },
  { id: "ASN-010", unitId: "150010", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP4123456", sample: "Muestra histórica 2025", start: "24/08/2026", end: "24/09/2026", progress: "35%", progressGroup: "En curso", status: "En proceso", dre: "Lima Metropolitana", ugel: "UGEL San Juan de Lurigancho", registrarId: "USR-0001", informantId: "INF-000010", recordCount: 100 },
  { id: "ASN-011", unitId: "150011", project: "IIE PRIVADAS", mode: "with-sample", instrument: "Ficha de seguimiento", userId: "AP5234567", sample: "Muestra de directores", start: "25/08/2026", end: "25/09/2026", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", dre: "Arequipa", ugel: "UGEL Arequipa Sur", registrarId: "USR-0001", informantId: "INF-000011", recordCount: 420 },
  { id: "ASN-012", unitId: "150012", project: "Instituciones educativas", mode: "with-sample", instrument: "Instrumento de evaluación", userId: "AP6345678", sample: "Piloto operativo", start: "26/08/2026", end: "26/09/2026", progress: "100%", progressGroup: "Completado", status: "Finalizada", dre: "Piura", ugel: "UGEL Piura", registrarId: "USR-0001", informantId: "INF-000012", recordCount: 80 },
];

const variableCatalog = [
  ["COD_MODULAR", "Código modular", "Texto"], ["NOMBRE_IE", "Nombre de la institución", "Texto"], ["GESTION_IE", "Gestión de la institución", "Texto"], ["DRE", "Dirección regional", "Texto"], ["UGEL", "Unidad de gestión educativa", "Texto"], ["DISTRITO", "Distrito", "Texto"], ["PROVINCIA", "Provincia", "Texto"], ["DEPARTAMENTO", "Departamento", "Texto"], ["NIVEL_EDUCATIVO", "Nivel educativo", "Texto"], ["TURNO", "Turno", "Texto"], ["AREA_GEOGRAFICA", "Área geográfica", "Texto"], ["DIRECCION", "Dirección", "Texto"], ["TELEFONO", "Teléfono", "Texto"], ["CORREO_IE", "Correo institucional", "Texto"], ["DIRECTOR", "Director", "Texto"], ["COD_LOCAL", "Código de local", "Texto"], ["CODIGO_UGEL", "Código UGEL", "Texto"], ["REGION", "Región", "Texto"], ["UBIGEO", "Código ubigeo", "Texto"], ["CENTRO_POBLADO", "Centro poblado", "Texto"], ["RED_EDUCATIVA", "Red educativa", "Texto"], ["TIPO_SERVICIO", "Tipo de servicio", "Texto"], ["MODALIDAD", "Modalidad", "Texto"], ["JORNADA", "Jornada escolar", "Texto"], ["NUMERO_AULAS", "Número de aulas", "Número"], ["NUMERO_DOCENTES", "Número de docentes", "Número"], ["NUMERO_ESTUDIANTES", "Número de estudiantes", "Número"], ["FECHA_CORTE", "Fecha de corte", "Fecha"], ["PERIODO", "Periodo", "Texto"], ["FUENTE_REGISTRO", "Fuente del registro", "Texto"], ["ID_PERSONA", "Identificador de persona", "Texto"], ["NOMBRE_COMPLETO", "Nombre completo", "Texto"], ["TIPO_DOCUMENTO", "Tipo de documento", "Texto"], ["NUMERO_DOCUMENTO", "Número de documento", "Texto"], ["FECHA_REGISTRO", "Fecha de registro", "Fecha"],
];

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function sampleFor(assignment) { return samples.find((sample) => sample.name === assignment.sample) || null; }
function sampleUserId(sample, index = 0) { return sample?.userIds?.[index] || sample?.userId || ""; }
function baseUnitId(assignment) { return Number(assignment.unitId) || 150001; }
function recordStatus(assignment) { return assignment.active === false ? "Inactiva" : assignment.status; }

function makeRecord(assignment, index, source = {}) {
  const sample = sampleFor(assignment);
  const unitId = source.unitId || (assignment.mode === "without-sample" ? "SIN-MUESTRA-001" : String(baseUnitId(assignment) + index).padStart(6, "0"));
  const userId = source.userId || assignment.userId || sampleUserId(sample, index);
  return { unitId, informantId: source.informantId || (assignment.mode === "without-sample" ? "INF-SIN-MUESTRA" : `INF-${String(index + 1).padStart(6, "0")}`), userId, institution: source.institution || (index % 2 === 0 ? "I.E. 0001 José de la Riva" : "I.E. 0042 San Martín"), sede: source.sede || "San José", dre: source.dre || assignment.dre || "Lima Metropolitana", ugel: source.ugel || assignment.ugel || "UGEL San Juan de Lurigancho", status: source.status || recordStatus(assignment) };
}

function buildRecords(assignment, sourceRecords = []) {
  if (Array.isArray(sourceRecords) && sourceRecords.length) return sourceRecords.map((record, index) => makeRecord(assignment, index, record));
  const total = assignment.mode === "without-sample" ? 1 : assignment.recordCount || sampleFor(assignment)?.total || 1;
  return Array.from({ length: total }, (_, index) => makeRecord(assignment, index));
}

function normalizeAssignment(item) {
  const normalized = { ...item, active: item.active !== false && item.status !== "Anulada" && item.status !== "Reasignada", history: Array.isArray(item.history) ? item.history : [], audit: Array.isArray(item.audit) ? item.audit : [], variablesByRecord: item.variablesByRecord && typeof item.variablesByRecord === "object" ? item.variablesByRecord : {} };
  normalized.records = Array.isArray(item.records) && item.records.length ? item.records.map((record, index) => makeRecord(normalized, index, record)) : buildRecords(normalized);
  normalized.recordCount = normalized.records.length;
  if (!normalized.informantId) normalized.informantId = normalized.records[0]?.informantId || "INF-SIN-MUESTRA";
  return normalized;
}

export function loadAssignments() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    return Array.isArray(stored) ? stored.map(normalizeAssignment) : clone(initialAssignments).map(normalizeAssignment);
  } catch {
    return clone(initialAssignments).map(normalizeAssignment);
  }
}

export function saveAssignments(nextAssignments) {
  const normalized = nextAssignments.map(normalizeAssignment);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function nextAssignmentId(items = loadAssignments()) {
  const nextNumber = items.reduce((max, item) => Math.max(max, Number(String(item.id).replace("ASN-", "")) || 0), 0) + 1;
  return `ASN-${String(nextNumber).padStart(3, "0")}`;
}

export function getAssignment(id) { return loadAssignments().find((item) => item.id === id) || null; }
export function getAssignmentRecords(assignment) { return assignment?.records?.length ? assignment.records : buildRecords(assignment || {}); }
export function getRecord(assignment, recordId) { const records = getAssignmentRecords(assignment); return records.find((record) => String(record.unitId) === String(recordId)) || records[0] || null; }
export function assignmentState(assignment) { return assignment?.active === false ? "Inactiva" : "Activa"; }
export function isReadOnlyAssignment(assignment) { return !assignment || assignment.active === false || ["Finalizada", "Anulada", "Reasignada"].includes(assignment.status); }
export function isEditableAssignment(assignment) { return !isReadOnlyAssignment(assignment) && assignment.status !== "En proceso"; }

export function createAssignment(input) {
  const items = loadAssignments();
  const draft = { id: nextAssignmentId(items), ...input, sample: input.sample || "Sin muestra", progress: "0%", progressGroup: "Sin iniciar", status: "Pendiente", active: true, dre: input.dre || "Lima Metropolitana", ugel: input.ugel || "UGEL San Juan de Lurigancho", registrarId: "USR-0001", history: [], audit: [{ action: "create", date: AUDIT_DATE, userId: "USR-0001" }] };
  draft.records = buildRecords(draft, input.records); draft.recordCount = draft.records.length; draft.informantId = draft.records[0]?.informantId || "INF-SIN-MUESTRA";
  saveAssignments([...items, draft]);
  return draft;
}

function normalizeDate(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return value;
  const [day, month, year] = String(value || "").split("/");
  return year && month && day ? `${year}-${month}-${day}` : "";
}

export const instrumentValidity = { start: "01/01/2026", end: "31/12/2026" };
export function isInstrumentValid(projectName, instrument, start, end) {
  const project = projects.find((item) => item.name === projectName);
  const periodStart = normalizeDate(start); const periodEnd = normalizeDate(end);
  return Boolean(project?.instruments.includes(instrument) && periodStart && periodEnd && periodStart >= normalizeDate(instrumentValidity.start) && periodEnd <= normalizeDate(instrumentValidity.end));
}

export function validateCreateAssignment(input) {
  const errors = []; const project = projects.find((item) => item.name === input.project); const sample = input.sample && input.sample !== "Sin muestra" ? findSample(input.sample) : null; const user = input.userId ? findUser(input.userId) : null;
  if (!project || !project.instruments.includes(input.instrument)) errors.push("Selecciona un instrumento asociado al proyecto.");
  if (input.mode === "with-sample") { if (!sample) errors.push("Selecciona una muestra válida."); else if (!sample.projects.includes(input.project) || !sample.instruments.includes(input.instrument)) errors.push("La muestra no está disponible para el proyecto e instrumento seleccionados."); }
  if (input.mode === "without-sample" && (!user || !user.active || !user.canReceiveAssignments)) errors.push("Selecciona un usuario activo con permisos para recibir instrumentos.");
  const start = normalizeDate(input.start); const end = normalizeDate(input.end); if (!start || !end || start > end) errors.push("Selecciona un periodo de asignación válido.");
  if (start && end && !isInstrumentValid(input.project, input.instrument, input.start, input.end)) errors.push("El instrumento no se encuentra vigente para el periodo seleccionado.");
  const duplicate = loadAssignments().some((item) => item.active !== false && item.project === input.project && item.instrument === input.instrument && item.sample === (input.sample || "Sin muestra") && item.userId === input.userId && normalizeDate(item.start) === start && normalizeDate(item.end) === end);
  if (duplicate) errors.push("Ya existe una asignación con los mismos datos y periodo.");
  return errors;
}

export function updateAssignment(id, changes) {
  const items = loadAssignments(); const current = items.find((item) => item.id === id); if (!current) return { ok: false, error: "No se encontró la asignación seleccionada." }; if (!isEditableAssignment(current)) return { ok: false, error: "La asignación no puede modificarse en su estado actual." };
  const active = Boolean(changes.active); const entry = { action: active ? "activate" : "inactivate", date: AUDIT_DATE, userId: "USR-0001" }; const updated = { ...current, active, audit: [...current.audit, entry], history: [...current.history, entry] };
  saveAssignments(items.map((item) => item.id === id ? updated : item)); return { ok: true, assignment: updated };
}

export function cancelAssignment(id) {
  const items = loadAssignments(); const entry = { action: "cancel", date: AUDIT_DATE, userId: "USR-0001", reason: "Anulación de la asignación" };
  return saveAssignments(items.map((item) => item.id === id ? { ...item, active: false, status: "Anulada", progress: "0%", progressGroup: "Sin iniciar", audit: [...item.audit, entry], history: [...item.history, entry] } : item));
}

export function validateReassignment(id, input) {
  const assignment = getAssignment(id); const user = findUser(input.userId); const errors = [];
  if (!assignment) errors.push("No se encontró la asignación seleccionada."); else if (assignment.active === false || ["Finalizada", "Anulada"].includes(assignment.status)) errors.push("La asignación no puede reasignarse en su estado actual.");
  if (!input.userId || !user?.id || !user.active || !user.canReceiveAssignments) errors.push("Selecciona un usuario activo con permisos para recibir instrumentos.");
  if (!input.reassignmentDate) errors.push("Selecciona la fecha de reasignación.");
  if (input.reassignmentDate && assignment && !isInstrumentValid(assignment.project, assignment.instrument, input.reassignmentDate, input.reassignmentDate)) errors.push("El instrumento no se encuentra vigente para la fecha de reasignación.");
  if (!input.reason?.trim()) errors.push("Ingresa el motivo de la reasignación."); return errors;
}

export function reassignAssignment(id, input) {
  const items = loadAssignments(); const current = items.find((item) => item.id === id); if (!current) return { ok: false, error: "No se encontró la asignación seleccionada." }; if (current.active === false || ["Finalizada", "Anulada"].includes(current.status)) return { ok: false, error: "La asignación no puede reasignarse en su estado actual." };
  const entry = { action: "reassign", assignmentId: current.id, userId: current.userId, start: current.start, end: current.end, status: "Inactiva", reason: input.reason, notify: Boolean(input.notify), date: input.reassignmentDate || AUDIT_DATE };
  const reassigned = { ...current, id: nextAssignmentId(items), userId: input.userId, notifyUser: Boolean(input.notify), status: "Pendiente", active: true, progress: "0%", progressGroup: "Sin iniciar", reassignedFromId: current.id, reassignmentDate: input.reassignmentDate || AUDIT_DATE, history: [...current.history, entry], audit: [...current.audit, entry], records: current.records.map((record) => ({ ...record, userId: input.userId, status: "Pendiente" })) };
  const previous = { ...current, active: false, status: "Reasignada", history: [...current.history, entry], audit: [...current.audit, entry] }; saveAssignments([...items.map((item) => item.id === id ? previous : item), reassigned]); return { ok: true, assignment: reassigned };
}

export function buildVariableDefinitions(assignment, record) {
  const user = findUser(record?.userId || assignment?.userId); const context = record || {}; const sample = findSample(assignment?.sample);
  const values = { COD_MODULAR: context.unitId, NOMBRE_IE: context.institution, DRE: context.dre, UGEL: context.ugel, REGION: context.dre, ID_PERSONA: user.id, NOMBRE_COMPLETO: user.name, FUENTE_REGISTRO: sample?.source || "Censo Educativo MINEDU" };
  const fallbacks = { GESTION_IE: "Pública", DISTRITO: "San José", PROVINCIA: "Lima", DEPARTAMENTO: "Lima", NIVEL_EDUCATIVO: "Secundaria", TURNO: "Mañana", AREA_GEOGRAFICA: "Urbana", DIRECCION: "Av. Principal 100", TELEFONO: "999 999 999", CORREO_IE: "contacto@ejemplo.edu.pe", DIRECTOR: "María López Pérez", COD_LOCAL: "L00150001", CODIGO_UGEL: "UGEL-001", UBIGEO: "150101", CENTRO_POBLADO: "San José", RED_EDUCATIVA: "Red Lima Centro", TIPO_SERVICIO: "Educación básica", MODALIDAD: "Presencial", JORNADA: "Regular", NUMERO_AULAS: "24", NUMERO_DOCENTES: "38", NUMERO_ESTUDIANTES: "620", FECHA_CORTE: "18/08/2026", PERIODO: "2026", TIPO_DOCUMENTO: "DNI", NUMERO_DOCUMENTO: "40123456", FECHA_REGISTRO: "18/08/2026" };
  return variableCatalog.map(([code, name, type]) => [code, name, type, values[code] ?? fallbacks[code] ?? ""]);
}

export function getRecordVariables(assignment, record) {
  const defaults = buildVariableDefinitions(assignment, record).map(([code, name, type, value]) => ({ code, name, type, value, source: findSample(assignment.sample)?.source || "Censo Educativo MINEDU" }));
  return Array.isArray(assignment.variablesByRecord?.[record.unitId]) ? assignment.variablesByRecord[record.unitId] : defaults;
}

export function saveRecordVariables(assignmentId, recordId, variables, action) {
  const items = loadAssignments(); const current = items.find((item) => item.id === assignmentId); if (!current || !isEditableAssignment(current)) return { ok: false, error: "La asignación está en solo lectura." };
  const entry = { action, recordId: String(recordId), date: AUDIT_DATE, userId: "USR-0001" }; const updated = { ...current, variablesByRecord: { ...current.variablesByRecord, [recordId]: clone(variables) }, audit: [...current.audit, entry], history: [...current.history, entry] };
  saveAssignments(items.map((item) => item.id === assignmentId ? updated : item)); return { ok: true, assignment: updated };
}

export function findUser(id) { return users.find((user) => user.id === id) || { id: id || "", name: "Usuario no disponible", active: false, canReceiveAssignments: false }; }
export function findProject(name) { return projects.find((project) => project.name === name) || projects[0]; }
export function findSample(name) { return samples.find((sample) => sample.name === name) || null; }
