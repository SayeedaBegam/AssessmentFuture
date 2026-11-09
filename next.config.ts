import type { NextConfig } from "next";
// Pages hosts static files under /<repository>. Local development keeps root URLs.
const githubPages = process.env.GITHUB_PAGES === "true";
const config: NextConfig = {
  poweredByHeader: false,
  ...(githubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: process.env.PAGES_BASE_PATH ?? "/AssessmentFuture",
        images: { unoptimized: true },
      }
    : {}),
};
export default config;
