import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/deployment",
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: "http://127.0.0.1:4173/AssessmentFuture/",
    launchOptions: process.env.PLAYWRIGHT_CHROME_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROME_PATH }
      : undefined,
  },
  webServer: {
    command: "node scripts/preview-pages.mjs",
    url: "http://127.0.0.1:4173/AssessmentFuture/",
    timeout: 30000,
  },
});
