export function createRecoveryState({ authType, tokenState }) {
  return { authType, tokenState, email: "", tokenUsed: false };
}
