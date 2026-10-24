import { defineConfig, devices } from '@playwright/test';

const configuredBase = process.env.RGUIDE_BASE_URL || 'https://kasemch.github.io/rguide-classroom/';
const baseURL = configuredBase.endsWith('/') ? configuredBase : configuredBase + '/';

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['line'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit-mobile', use: { ...devices['iPad (gen 7)'] } }
  ]
});
