import { passwordUsers } from "./data.js";

export function createPasswordState(authType) {
  const key = authType === "Passport" ? "passport" : "autoregistro";
  return { authType, user: { ...passwordUsers[key], authType }, completed: false };
}
