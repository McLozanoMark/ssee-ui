import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

async function bundle(name, files) {
  const output = files.map(async (file) => {
    const source = await readFile(resolve(root, file), "utf8");
    const withoutImports = source
      .replace(/import[\s\S]*?from\s+["'][^"']+["'];/g, "")
      .replace(/import\s+["'][^"']+["'];/g, "");
    return `/* source: ${file} */\n${withoutImports.replace(/^export /gm, "")}`;
  });
  const content = (await Promise.all(output)).join("\n\n");
  const indexLink = name === "ref-003-passport/dist/passport.js" || name === "ref-004-admision/dist/admission.js"
    ? 'const demoIndexLink=document.createElement("a");demoIndexLink.className="demo-index-link";demoIndexLink.href="../index.html";demoIndexLink.textContent="← Volver al índice";document.body.append(demoIndexLink);'
    : "";
  const target = resolve(root, name);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${indexLink}\n${content}`, "utf8");
}

await bundle("ref-001-roles/dist/roles.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "ref-001-roles/js/data.js",
  "ref-001-roles/js/state.js",
  "ref-001-roles/js/ui.js",
  "ref-001-roles/js/permissions.js",
  "ref-001-roles/js/roles.js",
  "ref-001-roles/js/main.js"
]);

await bundle("ref-002-permisos/dist/permissions.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "ref-002-permisos/js/data.js",
  "ref-002-permisos/js/state.js",
  "ref-002-permisos/js/permissions.js",
  "ref-002-permisos/js/ui.js",
  "ref-002-permisos/js/main.js"
]);

await bundle("ref-006-users/dist/users.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "ref-006-users/js/data.js",
  "ref-006-users/js/state.js",
  "ref-006-users/js/ui.js",
  "ref-006-users/js/users.js",
  "ref-006-users/js/main.js"
]);

await bundle("ref-004-admision/dist/admission.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "ref-004-admision/js/main.js"
]);

await bundle("ref-005-autoregistro/dist/autoregistro.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "ref-005-autoregistro/js/main.js"
]);

await bundle("ref-007-auth-passport/dist/auth.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "design-system/auth-validation.js",
  "design-system/auth-audit.js",
  "ref-007-auth-passport/js/main.js"
]);

await bundle("ref-008-auth-document/dist/auth.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "design-system/auth-validation.js",
  "design-system/auth-audit.js",
  "ref-008-auth-document/js/main.js"
]);

await bundle("ref-009-auth-autoregistro/dist/auth.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "design-system/auth-validation.js",
  "design-system/auth-audit.js",
  "ref-009-auth-autoregistro/js/main.js"
]);

await bundle("ref-012-password-change/dist/password.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "design-system/auth-audit.js",
  "ref-012-password-change/js/data.js",
  "ref-012-password-change/js/state.js",
  "ref-012-password-change/js/ui.js",
  "ref-012-password-change/js/password.js",
  "ref-012-password-change/js/main.js"
]);

await bundle("ref-013-password-recovery/dist/recovery.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "design-system/auth-audit.js",
  "ref-013-password-recovery/js/data.js",
  "ref-013-password-recovery/js/state.js",
  "ref-013-password-recovery/js/ui.js",
  "ref-013-password-recovery/js/recovery.js",
  "ref-013-password-recovery/js/main.js"
]);

await bundle("ref-014-logout/dist/logout.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "design-system/auth-audit.js",
  "ref-014-logout/js/data.js",
  "ref-014-logout/js/state.js",
  "ref-014-logout/js/session.js",
  "ref-014-logout/js/ui.js",
  "ref-014-logout/js/main.js"
]);

await bundle("ref-015-sessions/dist/sessions.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "design-system/auth-audit.js",
  "ref-015-sessions/js/data.js",
  "ref-015-sessions/js/state.js",
  "ref-015-sessions/js/session.js",
  "ref-015-sessions/js/ui.js",
  "ref-015-sessions/js/main.js"
]);

await bundle("ref-016-welcome/dist/welcome.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "ref-016-welcome/js/data.js",
  "ref-016-welcome/js/state.js",
  "ref-016-welcome/js/ui.js",
  "ref-016-welcome/js/main.js"
]);

await bundle("ref-003-passport/dist/passport.js", [
  "design-system/messages.js",
  "design-system/interaction.js",
  "ref-003-passport/js/main.js"
]);

await bundle("gio-ref-001-fuentes/dist/gio.js", [
  "design-system/interaction.js",
  "design-system/messages.js",
  "gio-ref-001-fuentes/js/data.js",
  "gio-ref-001-fuentes/js/state.js",
  "gio-ref-001-fuentes/js/ui.js",
  "gio-ref-001-fuentes/js/sources.js",
  "gio-ref-001-fuentes/js/main.js"
]);

await bundle("gio-ref-002-muestras/dist/gio.js", [
  "design-system/interaction.js",
  "design-system/messages.js",
  "gio-ref-002-muestras/js/data.js",
  "gio-ref-002-muestras/js/state.js",
  "gio-ref-002-muestras/js/ui.js",
  "gio-ref-002-muestras/js/samples.js",
  "gio-ref-002-muestras/js/main.js"
]);

await bundle("gio-ref-003-asignaciones/dist/gio.js", [
  "design-system/interaction.js",
  "design-system/messages.js",
  "gio-ref-003-asignaciones/js/data.js",
  "gio-ref-003-asignaciones/js/state.js",
  "gio-ref-003-asignaciones/js/ui.js",
  "gio-ref-003-asignaciones/js/assignments.js",
  "gio-ref-003-asignaciones/js/main.js"
]);
