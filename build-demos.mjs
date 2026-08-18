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
  const indexLink = name.includes("ref-003") || name.includes("ref-004")
    ? 'const demoIndexLink=document.createElement("a");demoIndexLink.className="demo-index-link";demoIndexLink.href="../index.html";demoIndexLink.textContent="← Volver al índice";document.body.append(demoIndexLink);'
    : "";
  const target = resolve(root, name);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${indexLink}\n${content}`, "utf8");
}

await bundle("ref-001-roles/dist/roles.js", [
  "ref-001-roles/js/data.js",
  "ref-001-roles/js/state.js",
  "ref-001-roles/js/ui.js",
  "ref-001-roles/js/permissions.js",
  "ref-001-roles/js/roles.js",
  "ref-001-roles/js/main.js"
]);

await bundle("ref-006-users/dist/users.js", [
  "ref-006-users/js/data.js",
  "ref-006-users/js/state.js",
  "ref-006-users/js/ui.js",
  "ref-006-users/js/users.js",
  "ref-006-users/js/main.js"
]);

await bundle("ref-004-admision/dist/admission.js", [
  "ref-004-admision/js/main.js"
]);

await bundle("ref-003-passport/dist/passport.js", [
  "ref-003-passport/js/main.js"
]);

await bundle("gio-ref-001-fuentes/dist/gio.js", [
  "design-system/interaction.js",
  "gio-ref-001-fuentes/js/data.js",
  "gio-ref-001-fuentes/js/state.js",
  "gio-ref-001-fuentes/js/ui.js",
  "gio-ref-001-fuentes/js/sources.js",
  "gio-ref-001-fuentes/js/main.js"
]);

await bundle("gio-ref-002-muestras/dist/gio.js", [
  "design-system/interaction.js",
  "gio-ref-002-muestras/js/data.js",
  "gio-ref-002-muestras/js/state.js",
  "gio-ref-002-muestras/js/ui.js",
  "gio-ref-002-muestras/js/samples.js",
  "gio-ref-002-muestras/js/main.js"
]);

await bundle("gio-ref-003-asignaciones/dist/gio.js", [
  "design-system/interaction.js",
  "gio-ref-003-asignaciones/js/data.js",
  "gio-ref-003-asignaciones/js/state.js",
  "gio-ref-003-asignaciones/js/ui.js",
  "gio-ref-003-asignaciones/js/assignments.js",
  "gio-ref-003-asignaciones/js/main.js"
]);
