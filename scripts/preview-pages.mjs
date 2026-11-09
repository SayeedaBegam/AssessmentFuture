// Local verification of the exported GitHub Pages files, including the repo prefix.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const prefix = process.env.PAGES_BASE_PATH ?? "/AssessmentFuture";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://127.0.0.1");
    const pathname = decodeURIComponent(url.pathname);
    if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
      response.writeHead(404).end();
      return;
    }
    let file = resolve(root, `.${pathname.slice(prefix.length) || "/"}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        response
          .writeHead(301, { Location: `${url.pathname}/${url.search}` })
          .end();
        return;
      }
      file = resolve(file, "index.html");
    }
    response.writeHead(200, {
      "Content-Type": types[extname(file)] ?? "application/octet-stream",
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
}).listen(4173, "127.0.0.1", () => {
  console.log(`Static Pages preview: http://127.0.0.1:4173${prefix}/`);
});
