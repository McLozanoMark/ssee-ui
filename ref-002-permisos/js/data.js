import { sharedPermissionOperations, sharedPermissionRows } from "../../design-system/permission-catalog.js";

export const operations = sharedPermissionOperations;

export const roles = [
  { id: "admin", name: "Administrador USE", description: "Gestiona configuración general del sistema.", status: "Activo" },
  { id: "supervisor", name: "Supervisor de Seguimiento", description: "Consulta y supervisa avances de seguimiento.", status: "Activo" },
  { id: "evaluator", name: "Evaluador", description: "Registra y revisa información de evaluación.", status: "Activo" }
];

export const permissionRows = sharedPermissionRows;
