export function createSessionMarker(user, role) {
  return { id: `demo-${Date.now()}`, user, role, createdAt: new Date().toISOString() };
}

export function invalidateSession() {
  try {
    sessionStorage.removeItem("ssee-single-session");
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
}

export function replaceActiveSession(marker) {
  try {
    sessionStorage.setItem("ssee-single-session", JSON.stringify(marker));
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
}
