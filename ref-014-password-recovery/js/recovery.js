export function validateResetPassword({ newPassword, confirmation, policy }) {
  if (![newPassword, confirmation].every((value) => value.trim())) return { ok: false, messageCode: "M11", reason: "Datos incompletos" };
  if (newPassword !== confirmation) return { ok: false, messageCode: "M32", reason: "Las contraseñas no coinciden" };
  if (newPassword.length < policy.minLength || !policy.uppercase.test(newPassword) || !policy.lowercase.test(newPassword) || !policy.number.test(newPassword)) return { ok: false, messageCode: "M31", reason: "Política de seguridad no cumplida" };
  return { ok: true };
}
