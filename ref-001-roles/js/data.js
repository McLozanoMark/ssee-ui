export const roles = [
  {
    name: "Administrador USE",
    description: "Gestiona configuración general del sistema.",
    permissions: ["Usuarios", "Configuración", "+8 adicionales"],
    permissionDetails: ["Seguimiento", "Evaluación", "Instrumentos", "Reportes", "Registro", "Consulta", "Auditoría", "Parámetros"],
    users: 3,
    status: "Activo",
    updated: "15/05/2024 10:30"
  },
  {
    name: "Supervisor de Seguimiento",
    description: "Consulta y supervisa avances de seguimiento.",
    permissions: ["Seguimiento", "Reportes", "+3 adicionales"],
    permissionDetails: ["Consulta", "Exportación", "Indicadores"],
    users: 7,
    status: "Activo",
    updated: "14/05/2024 16:45"
  },
  {
    name: "Evaluador",
    description: "Registra y revisa información de evaluación.",
    permissions: ["Evaluación", "Instrumentos", "+2 adicionales"],
    permissionDetails: ["Consulta", "Reportes"],
    users: 2,
    status: "Activo",
    updated: "13/05/2024 09:15"
  },
  {
    name: "Registrador",
    description: "Ingresa información operativa del sistema.",
    permissions: ["Registro", "Consulta"],
    permissionDetails: [],
    users: 0,
    status: "Inactivo",
    updated: "10/05/2024 11:20"
  },
  {
    name: "Consulta Estratégica",
    description: "Accede a reportes y tableros de seguimiento.",
    permissions: ["Visualización", "Reportes"],
    permissionDetails: [],
    users: 0,
    status: "Inactivo",
    updated: "08/05/2024 14:05"
  }
];

export const permissionRows = [
  { level: 1, name: "Administración", checks: [false, false, false, false, false, false] },
  { level: 2, name: "Gestión de usuarios", checks: [false, false, false, false, false, false] },
  { level: 3, name: "Consultar usuarios", checks: [true, false, false, false, false, false] },
  { level: 3, name: "Editar usuarios", checks: [true, false, true, false, false, false] },
  { level: 3, name: "Asignar roles", checks: [true, true, true, false, false, false] },
  { level: 3, name: "Sincronizar Passport", checks: [true, false, true, false, false, false] },
  { level: 1, name: "Seguimiento", checks: [false, false, false, false, false, false] },
  { level: 2, name: "Gestión de seguimiento", checks: [false, false, false, false, false, false] },
  { level: 3, name: "Crear seguimiento", checks: [true, true, false, false, false, false] },
  { level: 3, name: "Editar seguimiento", checks: [true, false, true, false, false, false] }
];
