export function createSessionState({ authType, expired }) {
  return { authType, expired, active: !expired, lastInteraction: new Date() };
}
