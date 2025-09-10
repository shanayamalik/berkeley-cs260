import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  outputDir: "./test-outputs/test-results",
  reporter: [
    [
      "html",
      {
        open: "never",
        outputFolder: "./test-outputs/html-report",
      },
    ],
  ],
  expect: {
    timeout: 1500,
  },
  fullyParallel: true,
  timeout: 10000,
  use: {
    baseURL: "http://127.0.0.1:6160",
    trace: "on",
  },

  projects: [
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
