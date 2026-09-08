export const welcomeProfiles = {
  passport: {
    name: "Luis Ramos",
    role: "Supervisor de Seguimiento",
    authType: "Passport",
    site: "Unidad de Seguimiento y Evaluación",
    institution: "Ministerio de Educación",
    process: "",
    modules: [
      { name: "Seguimiento", description: "Consulta y supervisa avances.", icon: "fa-chart-line" },
      { name: "Evaluación", description: "Revisa resultados e indicadores.", icon: "fa-clipboard-check" },
      { name: "Instrumentos", description: "Atiende instrumentos asignados.", icon: "fa-file-lines" },
      { name: "Reportes", description: "Consulta reportes disponibles.", icon: "fa-chart-column" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 12, pending: 4, sent: 8, contact: "Equipo de Seguimiento" }],
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
    modules: [
      { name: "Seguimiento", description: "Consulta el avance de tu proceso.", icon: "fa-chart-line" },
      { name: "Instrumentos", description: "Revisa los instrumentos asignados.", icon: "fa-file-lines" },
      { name: "Reportes", description: "Consulta reportes disponibles.", icon: "fa-chart-column" }
    ],
    projects: [{ name: "Seguimiento 2026", period: "2026", assigned: 8, pending: 2, sent: 6, contact: "Mesa de ayuda USE" }],
    notifications: [
      { title: "Instrumentos pendientes", text: "Tienes 2 instrumentos pendientes de atención.", icon: "fa-clipboard-list" },
      { title: "Registro habilitado", text: "Tu acceso al proceso Autoregistro 2026 está habilitado.", icon: "fa-circle-check" }
    ]
  }
};
