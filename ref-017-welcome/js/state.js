export function getWelcomeState(params, profiles) {
  const requested = params.get("auth") === "passport" ? "passport" : "autoregistro";
  return { profileKey: requested, profile: profiles[requested], notificationsOpen: false };
}
