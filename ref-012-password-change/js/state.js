import { passwordUsers } from "./data.js";

export function createPasswordState(authType) {
  const key = authType === "Passport" ? "passport" : "autoregistro";
  return { authType: passwordUsers[key].authType, user: passwordUsers[key], completed: false };
}
