import { sharedPermissionOperations, sharedPermissionRows } from "../../design-system/permission-catalog.js";

export const roles = [
  {
    id: "admin",
    name: "Administrador USE",
    description: "Gestiona configuración general del sistema.",
    permissions: ["Usuarios", "Configuración", "+8 adicionales"],
    permissionDetails: ["Seguimiento", "Evaluación", "Instrumentos", "Reportes", "Registro", "Consulta", "Auditoría", "Parámetros"],
    permissionPaths: [
      "Administración / Usuarios / Consultar usuarios",
      "Administración / Usuarios / Asignar roles",
      "Administración / Roles / Gestionar permisos de roles",
      "Registro / Registro de instrumento / Validación de instrumento"
    ],
    users: 3,
    status: "Activo",
    updated: "15/05/2024 10:30"
  },
  {
    id: "supervisor",
    name: "Supervisor de Seguimiento",
    description: "Consulta y supervisa avances de seguimiento.",
    permissions: ["Seguimiento", "Reportes", "+3 adicionales"],
    permissionDetails: ["Consulta", "Exportación", "Indicadores"],
    permissionPaths: [
      "Registro / Registro de instrumento",
      "Registro / Registro de instrumento / Validación de instrumento"
    ],
    users: 7,
    status: "Activo",
    updated: "14/05/2024 16:45"
  },
  {
    id: "evaluator",
    name: "Evaluador",
    description: "Registra y revisa información de evaluación.",
    permissions: ["Evaluación", "Instrumentos", "+2 adicionales"],
    permissionDetails: ["Consulta", "Reportes"],
    permissionPaths: [
      "Registro / Registro de instrumento / Validación de instrumento",
      "Administración / Usuarios / Consultar usuarios"
    ],
    users: 2,
    status: "Activo",
    updated: "13/05/2024 09:15"
  },
  {
    id: "registrador",
    name: "Registrador",
    description: "Ingresa información operativa del sistema.",
    permissions: ["Registro", "Consulta"],
    permissionDetails: ["Registro de instrumento"],
    permissionPaths: ["Registro / Registro de instrumento"],
    users: 0,
    status: "Inactivo",
    updated: "10/05/2024 11:20"
  },
  {
    id: "consulta",
    name: "Consulta Estratégica",
    description: "Accede a reportes y tableros de seguimiento.",
    permissions: ["Visualización", "Reportes"],
    permissionDetails: ["Consultar usuarios"],
    permissionPaths: ["Administración / Usuarios / Consultar usuarios"],
    users: 0,
    status: "Inactivo",
    updated: "08/05/2024 14:05"
  }
];

export const operations = sharedPermissionOperations;
export const permissionRows = sharedPermissionRows;
