export const sharedPermissionOperations = ["Consultar", "Registrar", "Modificar", "Eliminar", "Exportar", "Validar"];

const row = (id, level, type, name, parentId, checks, unavailable = []) => ({
  id,
  level,
  type,
  name,
  parentId,
  checks: { ...checks },
  unavailable: [...unavailable]
});

// Canonical prototype catalog shared by the role wizard and the REF-002 traceability route.
export const sharedPermissionRows = [
  row("administracion", 1, "module", "Administración", null, { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }),
  row("usuarios", 2, "submenu", "Gestión de usuarios", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }),
  row("usuarios-consulta", 3, "functionality", "Consultar usuarios", "usuarios", { Consultar: true, Registrar: false, Modificar: false, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Modificar", "Eliminar", "Validar"]),
  row("usuarios-roles", 3, "functionality", "Asignar roles", "usuarios", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: false, Validar: false }, ["Eliminar", "Exportar", "Validar"]),
  row("roles", 2, "submenu", "Gestión de roles", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Validar"]),
  row("roles-permisos", 3, "functionality", "Gestionar permisos de roles", "roles", { Consultar: true, Registrar: false, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Eliminar", "Validar"]),
  row("instrumentos", 1, "module", "Instrumentos", null, { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: true }),
  row("instrumentos-gestion", 2, "submenu", "Gestión de instrumentos", "instrumentos", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: true }),
  row("instrumentos-registro", 3, "functionality", "Registro de instrumentos", "instrumentos-gestion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Validar"]),
  row("instrumentos-validacion", 3, "functionality", "Validación de instrumentos", "instrumentos-gestion", { Consultar: true, Registrar: false, Modificar: true, Eliminar: false, Exportar: false, Validar: true }, ["Eliminar", "Exportar"])
];
