export const welcomeProfiles = {
  passport: {
    name: "Ana Paredes",
    role: "Supervisor de Seguimiento",
    authType: "Passport",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    quickAccess: [
      { name: "Cambiar contraseña", icon: "fa-key" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: { name: "Equipo de Seguimiento", email: "seguimiento@ejemplo.gob.pe" } }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 4 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Nuevo reporte disponible", text: "El reporte de avance del periodo 2026 está disponible.", icon: "fa-file-lines" },
      { title: "Actualización de proyecto", text: "Se actualizó la información de Seguimiento 2026.", icon: "fa-circle-info" }
    ]
  },
  document: {
    name: "Ana Paredes",
    role: "Supervisor de Seguimiento",
    authType: "Documento",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    quickAccess: [
      { name: "Cambiar contraseña", icon: "fa-key" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: { name: "Equipo de Seguimiento", email: "seguimiento@ejemplo.gob.pe" } }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 4 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Nuevo reporte disponible", text: "El reporte de avance del periodo 2026 está disponible.", icon: "fa-file-lines" },
      { title: "Actualización de proyecto", text: "Se actualizó la información de Seguimiento 2026.", icon: "fa-circle-info" }
    ]
  },
  autoregistro: {
    name: "Ana Paredes",
    role: "Administrador USE",
    authType: "Autoregistro",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "Autoregistro 2026",
    quickAccess: [
      { name: "Registrar usuario", icon: "fa-user-plus" },
      { name: "Cambiar contraseña", icon: "fa-key" },
      { name: "Crear rol", icon: "fa-user-shield" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 8, pending: 2, sent: 6, contact: { name: "Mesa de ayuda USE", email: "mesa.ayuda@ejemplo.gob.pe", phone: "(01) 615-5800" } }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 2 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Registro habilitado", text: "Tu acceso al proceso Autoregistro 2026 está habilitado.", icon: "fa-circle-check" }
    ]
  }
};
