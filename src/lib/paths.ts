export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\/+/, "");
  if (!clean) {
    return base.endsWith("/") ? base : `${base}/`;
  }
  if (base === "/") {
    return `/${clean}`;
  }
  return `${base.replace(/\/+$/, "")}/${clean}`;
}

export function absoluteUrl(path: string): string {
  const site = (import.meta.env.SITE || "https://iamsupersocks.github.io").replace(
    /\/+$/,
    "",
  );
  const resolved = withBase(path);
  return `${site}${resolved.startsWith("/") ? resolved : `/${resolved}`}`;
}
