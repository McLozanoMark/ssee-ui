export const sources = [
  {
    id: "FDT-001",
    name: "Instituciones educativas",
    description: "Directorio validado de instituciones educativas.",
    origin: "Interna",
    originDetail: "NEXUS",
    usage: ["Precarga de variables"],
    records: "12,450",
    status: "Activa",
    updated: "18/08/2026 09:00",
    createdBy: "Administrador",
    updatedBy: "Administrador",
    createdAt: "15/08/2026 09:30",
    inUse: true,
    relations: "Relacionada con 2 muestras",
    previewRecords: [
      { "Código modular": "150101", "Nombre de la institución": "I.E. José María Arguedas", DRE: "Lima Metropolitana", UGEL: "UGEL 03" },
      { "Código modular": "150102", "Nombre de la institución": "I.E. República del Perú", DRE: "Lima Metropolitana", UGEL: "UGEL 04" }
    ],
    history: [
      { date: "15/08/2026 09:30", action: "Creación", user: "Administrador" },
      { date: "18/08/2026 09:00", action: "Actualización", user: "Administrador" }
    ],
    fields: [
      { name: "Código modular", type: "Texto", required: true, description: "Código oficial de la institución." },
      { name: "Nombre de la institución", type: "Texto", required: true, description: "Nombre registrado." },
      { name: "DRE", type: "Texto", required: true, description: "Dirección Regional de Educación." },
      { name: "UGEL", type: "Texto", required: false, description: "Unidad de Gestión Educativa Local." }
    ],
    keyFields: ["Código modular"]
  },
  {
    id: "FDT-002",
    name: "Directores registrados",
    description: "Directores asociados a cada institución.",
    origin: "Externa",
    originDetail: "Carga masiva",
    usage: ["Generación de fichas"],
    records: "3,180",
    status: "Activa",
    updated: "17/08/2026 16:45",
    createdBy: "Administrador",
    updatedBy: "Administrador",
    createdAt: "14/08/2026 11:10",
    inUse: false,
    relations: "Sin relaciones registradas",
    previewRecords: [
      { "DNI del director": "71234567", "Nombres y apellidos": "Juan Pérez López", "Código modular": "150101" },
      { "DNI del director": "71234568", "Nombres y apellidos": "María Fernández García", "Código modular": "150102" }
    ],
    history: [
      { date: "14/08/2026 11:10", action: "Creación", user: "Administrador" },
      { date: "17/08/2026 16:45", action: "Actualización", user: "Administrador" }
    ],
    fields: [
      { name: "DNI del director", type: "Texto", required: true, description: "Documento de identidad." },
      { name: "Nombres y apellidos", type: "Texto", required: true, description: "Nombre completo." },
      { name: "Código modular", type: "Texto", required: true, description: "Institución asociada." }
    ],
    keyFields: ["DNI del director"]
  },
  { id: "FDT-003", name: "Operativo piloto", description: "Registro sintético para pruebas del operativo.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "620", status: "Activa", updated: "16/08/2026 11:20", fields: [], keyFields: [] },
  { id: "FDT-004", name: "Instituciones 2025", description: "Histórico de instituciones del periodo anterior.", origin: "Externa", originDetail: "Carga masiva", usage: ["Precarga de variables"], records: "11,890", status: "Inactiva", updated: "12/08/2026 10:05", updatedBy: "Administrador", inactivatedBy: "Administrador", inactivationReason: "Cierre del periodo operativo.", fields: [], keyFields: [] },
  { id: "FDT-005", name: "Registro observado", description: "Fuente no disponible para nuevas operaciones.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "0", status: "Inactiva", updated: "08/08/2026 14:05", updatedBy: "Administrador", inactivatedBy: "Administrador", inactivationReason: "Fuente reemplazada.", fields: [], keyFields: [] }
];
