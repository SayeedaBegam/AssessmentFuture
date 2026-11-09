// Next 16.4 Windows exports can retain backslash-based segment directories.
// Add the flat filenames requested by the client. Linux exports already have them.
import { readdir, copyFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else {
      const parts = relative("out", file).split(sep);
      const segmentStart = parts.findIndex((part) =>
        part.startsWith("__next."),
      );
      if (segmentStart >= 0 && segmentStart < parts.length - 1) {
        const target = join(
          "out",
          ...parts.slice(0, segmentStart),
          parts.slice(segmentStart).join("."),
        );
        await copyFile(file, target);
      }
    }
  }
}
if (process.env.GITHUB_PAGES !== "true") {
  throw new Error("Set GITHUB_PAGES=true before running npm run build:pages.");
}
await walk("out");
await writeFile("out/.nojekyll", "");
