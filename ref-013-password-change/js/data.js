export const passwordUsers = {
  autoregistro: { name: "Ana Paredes", email: "ana.paredes@ejemplo.gob.pe", authType: "Autoregistro", currentPassword: "ClaveSegura1" },
  passport: { name: "Luis Ramos", email: "luis.ramos@ejemplo.gob.pe", authType: "Passport", currentPassword: null }
};

export const passwordPolicy = {
  minLength: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/
};
