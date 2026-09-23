const AUDIT_STORAGE_KEY = "ssee-auth-audit";

export function recordAuditEvent({ user, authType, operation = "Inicio de sesión", closureType = "", result, reason = "" }) {
  const entry = {
    timestamp: new Date().toISOString(),
    user,
    authenticationType: authType,
    operation,
    closureType,
    result,
    reason
  };
  try {
    const current = JSON.parse(sessionStorage.getItem(AUDIT_STORAGE_KEY) || "[]");
    sessionStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify([entry, ...current].slice(0, 50)));
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
  return entry;
}

export function recordAuthAttempt(args) {
  return recordAuditEvent(args);
}
