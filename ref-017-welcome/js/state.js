export function getWelcomeState(params, profiles) {
  const requested = ["passport", "document", "autoregistro"].includes(params.get("auth")) ? params.get("auth") : "autoregistro";
  return { profileKey: requested, profile: profiles[requested], notificationsOpen: false };
}
