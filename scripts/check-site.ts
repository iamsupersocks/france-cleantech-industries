import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const secretPattern =
  /(sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16}|BEGIN (RSA |OPENSSH |PGP )?PRIVATE KEY)/;

const requiredFiles = [
  "index.html",
  "notre-histoire/index.html",
  "membres/index.html",
  "contact/index.html",
  "actualites/index.html",
  "documents-france-cleantech-industries/index.html",
  "finance-cleantechs-industrielles-francaises/index.html",
  "exora/index.html",
  "enertime/index.html",
  "sylfen/index.html",
  "nouveau-site-fci/index.html",
  "document/etude-fci-2024-les-cleantechs-industrielles-en-france-innovation-financement-marche/index.html",
  "nos-membres/index.html",
  "sitemap-index.xml",
  "robots.txt",
  "404.html",
];

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(resolved);
      }
      return [resolved];
    }),
  );
  return files.flat();
}

function extractHrefs(html: string): string[] {
  return [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
}

const missing: string[] = [];
for (const file of requiredFiles) {
  try {
    await stat(path.join(dist, file));
  } catch {
    missing.push(file);
  }
}

const htmlFiles = (await walk(dist)).filter((file) => file.endsWith(".html"));
const secretHits: string[] = [];
const broken: string[] = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (secretPattern.test(html)) {
    secretHits.push(path.relative(dist, file));
  }
  if (/<form[\s>]/i.test(html) && /<input[^>]+type="email"/i.test(html)) {
    secretHits.push(`deceptive-form:${path.relative(dist, file)}`);
  }
  for (const href of extractHrefs(html)) {
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("#") ||
      href.startsWith("data:")
    ) {
      continue;
    }
    const clean = href.split("#")[0]?.split("?")[0] ?? "";
    if (!clean || clean === "/") {
      continue;
    }
    const relative = clean
      .replace(/^\/france-cleantech-industries\//, "")
      .replace(/^\/+/, "");
    if (!relative) {
      continue;
    }
    const candidates = [
      path.join(dist, relative),
      path.join(dist, relative, "index.html"),
      path.join(dist, `${relative}.html`),
    ];
    const exists = await Promise.any(
      candidates.map(async (candidate) => {
        await stat(candidate);
        return true;
      }),
    ).catch(() => false);
    if (!exists) {
      broken.push(`${path.relative(dist, file)} -> ${href}`);
    }
  }
}

if (missing.length || secretHits.length || broken.length) {
  console.error(
    JSON.stringify({ missing, secretHits, broken: broken.slice(0, 40) }, null, 2),
  );
  process.exit(1);
}

process.stdout.write(
  `check-site ok files=${htmlFiles.length} required=${requiredFiles.length}\n`,
);
