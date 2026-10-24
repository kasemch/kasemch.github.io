import { test, expect } from '@playwright/test';

const code = process.env.RGUIDE_QA_CODE;
const pin = process.env.RGUIDE_QA_PIN;
const hasQaIdentity = Boolean(code && pin);

async function login(page, path) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  if (path.includes('coach')) {
    await page.locator('#code').selectOption(code);
    await page.locator('#pin').fill(pin);
    await page.locator('#loginBtn').click();
    await expect(page.locator('#app')).toBeVisible();
  } else {
    await page.locator('#loginCode').selectOption(code);
    await page.locator('#loginPin').fill(pin);
    await page.locator('#loginBtn').click();
    await expect(page.locator('#app')).toBeVisible();
  }
}

test.describe('R-GUIDE authenticated E2E', () => {
  test.skip(!hasQaIdentity, 'Set RGUIDE_QA_CODE and RGUIDE_QA_PIN as GitHub Actions secrets to enable authenticated E2E.');

  test('student can load assignments without exposing PII', async ({ page }) => {
    await login(page, './');
    await expect(page.locator('#identity')).toContainText(code);
    await expect(page.locator('#assignmentList')).toContainText('PREP0');
    await expect(page.locator('#assignmentList')).toContainText('SESSION1');
    await expect(page.locator('#assignmentList')).toContainText('SELFSTUDY1');
  });

  test('Research Coach returns governed structured feedback', async ({ page }) => {
    await login(page, './coach.html');
    await page.locator('#assignment').selectOption('PREP0');
    await page.locator('#component').selectOption('RESEARCH_QUESTION');
    await page.locator('#studentContent').fill('QA synthetic question: What is the relationship between sociometric status and participation among university students?');
    await page.locator('#coachBtn').click();
    await expect(page.locator('#coachOut')).toContainText('Status:');
    await expect(page.locator('#coachOut')).toContainText('WHAT — Issues');
    await expect(page.locator('#coachOut')).toContainText('WHY');
    await expect(page.locator('#coachOut')).toContainText('HOW');
    await expect(page.locator('#coachOut')).toContainText('Evidence Needed');
    await expect(page.locator('#coachOut')).toContainText('NEXT ACTION');
    await expect(page.locator('#coachOut')).toContainText('Human Academic Authority required');
    await expect(page.locator('#coachOut')).toContainText('Evidence verified by AI: NO');
  });

  test('Evidence Inspector prevents student VERIFIED selection', async ({ page }) => {
    await login(page, './coach.html');
    const statuses = await page.locator('#evStatus option').allTextContents();
    expect(statuses).not.toContain('VERIFIED');
    await expect(page.getByText(/นักศึกษาไม่สามารถตั้งสถานะ VERIFIED เองได้/)).toBeVisible();
  });
});
