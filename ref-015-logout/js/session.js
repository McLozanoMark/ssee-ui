export function invalidateSession() {
  try {
    sessionStorage.removeItem("ssee-demo-session");
  } catch {
    // The demo remains usable when browser storage is unavailable.
  }
}
