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
  row("usuarios", 2, "submenu", "Usuarios", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }),
  row("usuarios-consulta", 3, "functionality", "Consultar usuarios", "usuarios", { Consultar: true, Registrar: false, Modificar: false, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Modificar", "Eliminar", "Validar"]),
  row("usuarios-roles", 3, "functionality", "Asignar roles", "usuarios", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: false, Validar: false }, ["Eliminar", "Exportar", "Validar"]),
  row("roles", 2, "submenu", "Roles", "administracion", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Validar"]),
  row("roles-permisos", 3, "functionality", "Gestionar permisos de roles", "roles", { Consultar: true, Registrar: false, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Registrar", "Eliminar", "Validar"]),
  row("registro", 1, "module", "Registro", null, { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: true }, ["Eliminar"]),
  row("registro-instrumento", 2, "submenu", "Registro de instrumento", "registro", { Consultar: true, Registrar: true, Modificar: true, Eliminar: false, Exportar: true, Validar: false }, ["Eliminar", "Validar"]),
  row("registro-validacion", 3, "functionality", "Validación de instrumento", "registro-instrumento", { Consultar: true, Registrar: false, Modificar: false, Eliminar: false, Exportar: false, Validar: true }, ["Registrar", "Modificar", "Eliminar", "Exportar"])
];
