import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const chrome = process.env.PLAYWRIGHT_CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: { timeout: 8000 },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3310",
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: existsSync(chrome) ? { executablePath: chrome } : {},
  },
  webServer: [
    { command: "node tests/fixtures/redis.mjs", url: "http://127.0.0.1:3311/health", reuseExistingServer: false },
    {
      command: "npm run start -- --port 3310",
      url: "http://localhost:3310",
      reuseExistingServer: false,
      timeout: 120000,
      env: {
        ADMIN_PASSWORD: "local-test-password-only-2026",
        UPSTASH_REDIS_REST_URL: "http://127.0.0.1:3311",
        UPSTASH_REDIS_REST_TOKEN: "local-fixture-token",
        NEXT_TELEMETRY_DISABLED: "1",
      },
    },
  ],
});
