import { test, expect } from '@playwright/test';

const API = 'https://zimbrsdvxogsfmpflxcr.supabase.co/functions/v1/classroom-api';

test.describe('R-GUIDE public readiness and safety', () => {
  test('Student Start exposes the three canonical entry points', async ({ page }) => {
    const response = await page.goto('./start.html', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'R-GUIDE Student Start' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Classroom/ })).toHaveAttribute('href', './');
    await expect(page.getByRole('link', { name: /Research Coach \+ Evidence Inspector \+ My Progress/ })).toHaveAttribute('href', './coach.html');
    await expect(page.getByRole('link', { name: /คู่มือ/ })).toHaveAttribute('href', './guide.html');
  });

  test('Classroom login is privacy-minimal and invalid credentials fail closed', async ({ page }) => {
    const response = await page.goto('./', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'R-GUIDE Classroom' })).toBeVisible();
    await expect(page.locator('#loginCode')).toBeVisible();
    await expect(page.locator('#loginPin')).toBeVisible();
    await expect(page.getByText(/ไม่ต้องกรอกชื่อจริง/)).toBeVisible();

    await page.locator('#loginCode').selectOption('S01');
    await page.locator('#loginPin').fill('INVALID-QA-PIN');
    await page.locator('#loginBtn').click();
    await expect(page.locator('#loginMsg')).toContainText(/ไม่ถูกต้อง|เข้าสู่ระบบไม่ได้/);
    await expect(page.locator('#app')).toHaveClass(/hidden/);
  });

  test('Coach page exposes governed Evidence Inspector without VERIFIED student option', async ({ page }) => {
    const response = await page.goto('./coach.html', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Research Coach + Evidence Inspector' })).toBeVisible();
    await expect(page.locator('#login')).toBeVisible();
    await expect(page.locator('#app')).toHaveClass(/hidden/);
    const statuses = await page.locator('#evStatus option').allTextContents();
    expect(statuses).toEqual(['TO VERIFY', 'CANDIDATE', 'PARTIAL', 'CONTRADICTORY']);
    expect(statuses).not.toContain('VERIFIED');
  });

  test('Classroom API rejects unauthenticated assignment access', async ({ request }) => {
    const response = await request.post(API, { data: { action: 'listAssignments' } });
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    const body = await response.json();
    expect(String(body.error || '')).toMatch(/SESSION_REQUIRED|INVALID|UNAUTHORIZED/i);
  });
});
