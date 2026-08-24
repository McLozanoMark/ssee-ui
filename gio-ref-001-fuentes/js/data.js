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
    status: "Borrador",
    updated: "17/08/2026 16:45",
    fields: [
      { name: "DNI del director", type: "Texto", required: true, description: "Documento de identidad." },
      { name: "Nombres y apellidos", type: "Texto", required: true, description: "Nombre completo." },
      { name: "Código modular", type: "Texto", required: true, description: "Institución asociada." }
    ],
    keyFields: ["DNI del director"]
  },
  { id: "FDT-003", name: "Operativo piloto", description: "Registro sintético para pruebas del operativo.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "620", status: "Borrador", updated: "16/08/2026 11:20", fields: [], keyFields: [] },
  { id: "FDT-004", name: "Instituciones 2025", description: "Histórico de instituciones del periodo anterior.", origin: "Externa", originDetail: "Carga masiva", usage: ["Precarga de variables"], records: "11,890", status: "Inactiva", updated: "12/08/2026 10:05", fields: [], keyFields: [] },
  { id: "FDT-005", name: "Registro observado", description: "Fuente anulada luego de la revisión de calidad.", origin: "Externa", originDetail: "Manual", usage: ["Generación de fichas"], records: "0", status: "Anulada", updated: "08/08/2026 14:05", fields: [], keyFields: [] }
];
