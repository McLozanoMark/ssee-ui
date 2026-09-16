const institutionFields = ["ID_PERSONA", "NOMBRE_COMPLETO", "FECHA_NACIMIENTO", "SEXO", "DEPARTAMENTO", "PROVINCIA", "DISTRITO", "DIRECCION", "TELEFONO", "CORREO", "COD_USUARIO", "ESTADO"];

export const sourceCatalog = [
  { name: "Nexus", population: 12450, fields: institutionFields },
  { name: "Escale", population: 9820, fields: institutionFields },
  { name: "Directores registrados", population: 3180, fields: ["ID_PERSONA", "NOMBRE_COMPLETO", "FECHA_NACIMIENTO", "DNI", "REGION", "DISTRITO", "CORREO", "COD_USUARIO"] },
  { name: "Padrón RER", population: 620, fields: ["ID_UNIDAD", "ID_PERSONA", "NOMBRE_COMPLETO", "REGION", "DISTRITO", "FECHA_NACIMIENTO", "COD_USUARIO"] },
  { name: "Instituciones educativas", population: 12450, fields: institutionFields },
  { name: "Operativo piloto", population: 620, fields: ["ID_UNIDAD", "ID_PERSONA", "NOMBRE_COMPLETO", "REGION", "DISTRITO", "FECHA_NACIMIENTO", "COD_USUARIO"] },
  { name: "Instituciones 2025", population: 11890, fields: institutionFields }
];

export const projectCatalog = [
  { name: "IIE PRIVADAS", instruments: ["Supervisión a Instituciones Educativas Privadas - Aspectos Económicos", "Supervisión a Instituciones Educativas Privadas - Aspectos Legales"] },
  { name: "Seguimiento 2026", instruments: ["Instrumento de seguimiento"] },
  { name: "Evaluación de directores 2026", instruments: ["Ficha de evaluación"] },
  { name: "Operativo piloto", instruments: ["Lista de verificación"] }
];

export const sampleUnitCatalog = [
  { id: "UM-0001", personId: "P000987654", name: "María López Pérez", region: "Lima", district: "San Juan de Lurigancho", birthDate: "12/05/1985" },
  { id: "UM-0002", personId: "P000987655", name: "Juan Carlos Ramírez", region: "Arequipa", district: "Cerro Colorado", birthDate: "23/11/1990" },
  { id: "UM-0003", personId: "P000987656", name: "Ana Lucía Torres", region: "Piura", district: "Castilla", birthDate: "07/03/1978" },
  { id: "UM-0004", personId: "P000987657", name: "Pedro Miguel Silva", region: "Cusco", district: "Santiago", birthDate: "19/08/1992" },
  { id: "UM-0005", personId: "P000987658", name: "Rosa Elena Vargas", region: "La Libertad", district: "Trujillo", birthDate: "30/01/1983" },
  { id: "UM-0006", personId: "P000987659", name: "Luis Alberto Pérez", region: "Lima", district: "Ate", birthDate: "15/02/1987" },
  { id: "UM-0007", personId: "P000987660", name: "Carla Medina Rojas", region: "Callao", district: "Callao", birthDate: "03/11/1988" },
  { id: "UM-0008", personId: "P000987661", name: "Diego Flores Quispe", region: "Junín", district: "Huancayo", birthDate: "26/06/1981" },
  { id: "UM-0009", personId: "P000987662", name: "Elena Salazar Díaz", region: "Lambayeque", district: "Chiclayo", birthDate: "18/09/1986" },
  { id: "UM-0010", personId: "P000987663", name: "Jorge Castillo León", region: "Ayacucho", district: "Huamanga", birthDate: "08/12/1979" },
  { id: "UM-0011", personId: "P000987664", name: "Sofía Campos Ruiz", region: "Lima", district: "Comas", birthDate: "22/08/1990" },
  { id: "UM-0012", personId: "P000987665", name: "Andrés Navarro Soto", region: "Tacna", district: "Tacna", birthDate: "14/04/1984" }
];

export const samples = [
  { id: "MST-001", name: "Muestra nacional 2026", description: "Muestra principal para seguimiento institucional.", intervention: "Seguimiento", period: "2026", project: "Seguimiento 2026", source: "Instituciones educativas", units: "1,250", sampleSize: "100", population: "1250", selectionMethod: "Aleatoria", fields: [{ name: "Código modular", unique: true, preload: true }, { name: "Nombre de la institución", unique: false, preload: true }, { name: "DRE", unique: false, preload: false }], unitList: [{ id: "IE-0001", name: "I.E. 0001 José de la Riva", status: "Seleccionada" }, { id: "IE-0042", name: "I.E. 0042 San Martín", status: "Seleccionada" }], instruments: ["Instrumento de seguimiento"], status: "Activo", updated: "18/08/2026 09:00" },
  { id: "MST-002", name: "Muestra de directores", description: "Unidades seleccionadas para evaluación de directores.", intervention: "Evaluación", period: "2026", project: "Evaluación de directores 2026", source: "Directores registrados", units: "420", sampleSize: "60", population: "420", selectionMethod: "Sistemática", fields: [{ name: "DNI", unique: true, preload: true }, { name: "Nombre completo", unique: false, preload: true }], unitList: [{ id: "DIR-001", name: "Director registrado 001", status: "Seleccionada" }], instruments: ["Ficha de evaluación"], status: "Activo", updated: "17/08/2026 16:45" },
  { id: "MST-003", name: "Piloto operativo", description: "Configuración sintética para validar reglas de selección.", intervention: "Operativo", period: "2026", project: "Operativo piloto", source: "Operativo piloto", units: "80", sampleSize: "20", population: "80", selectionMethod: "Total", fields: [{ name: "Código de unidad", unique: true, preload: false }], unitList: [{ id: "OP-001", name: "Unidad piloto 001", status: "Seleccionada" }], instruments: ["Lista de verificación"], status: "Activo", updated: "16/08/2026 11:20" },
  { id: "MST-004", name: "Muestra histórica 2025", description: "Muestra del periodo anterior conservada para consulta.", intervention: "Seguimiento", period: "2025", project: "Seguimiento 2026", source: "Instituciones 2025", units: "980", sampleSize: "80", population: "980", selectionMethod: "Aleatoria", fields: [{ name: "Código modular", unique: true, preload: true }], unitList: [], instruments: ["Instrumento de seguimiento"], status: "Inactivo", updated: "12/08/2026 10:05" },
  { id: "MST-005", name: "Muestra de cobertura", description: "Muestra de cobertura para evaluación institucional.", intervention: "Evaluación", period: "2025", project: "Evaluación de directores 2026", source: "Directores registrados", units: "0", sampleSize: "10", population: "0", selectionMethod: "Aleatoria", fields: [{ name: "DNI", unique: true, preload: true }], unitList: [], instruments: ["Ficha de evaluación"], status: "Inactivo", updated: "08/08/2026 14:05" }
];
