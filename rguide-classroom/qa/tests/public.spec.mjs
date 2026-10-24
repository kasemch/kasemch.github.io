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

  test('Verified-email registration is Thai-first, guided, privacy-minimal, and requires consent', async ({ page }) => {
    const response = await page.goto('./register.html', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /ลงทะเบียน R-GUIDE/ })).toBeVisible();
    await expect(page.getByText(/ชื่อ · First name/)).toBeVisible();
    await expect(page.getByText(/นามสกุล · Last name/)).toBeVisible();
    await expect(page.getByText(/รหัสนักศึกษา · Student ID/)).toBeVisible();
    await expect(page.getByText(/อีเมล · Email/)).toBeVisible();
    await expect(page.getByText(/กรอกชื่อจริง ไม่ต้องใส่คำนำหน้าชื่อ/)).toBeVisible();
    await expect(page.getByText(/ระบบจะส่งลิงก์ยืนยันไปที่อีเมลนี้/)).toBeVisible();
    await expect(page.locator('#firstName')).toBeVisible();
    await expect(page.locator('#lastName')).toBeVisible();
    await expect(page.locator('#studentId')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#consent')).not.toBeChecked();
    await page.locator('#firstName').fill('QA');
    await page.locator('#lastName').fill('Student');
    await page.locator('#studentId').fill('QA0001');
    await page.locator('#email').fill('qa@example.invalid');
    await page.locator('#sendLink').click();
    await expect(page.locator('#msg')).toContainText(/Privacy Notice/);
    await expect(page.locator('.h').getByText(/Passwordless/)).toBeVisible();
    await expect(page.getByText(/Identity Vault/)).toBeVisible();
  });

  test('Classroom login is Thai-first, privacy-minimal, and invalid credentials fail closed', async ({ page }) => {
    const response = await page.goto('./', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'R-GUIDE Classroom', exact: true })).toBeVisible();
    await expect(page.getByText(/รหัสผู้เรียน · Student Code/)).toBeVisible();
    await expect(page.getByText(/รหัสเข้าใช้ · Access PIN/)).toBeVisible();
    await expect(page.getByText(/เลือกรหัสที่อาจารย์มอบให้/)).toBeVisible();
    await expect(page.locator('#loginCode')).toBeVisible();
    await expect(page.locator('#loginPin')).toBeVisible();
    await expect(page.getByText(/ไม่ต้องกรอกชื่อจริง/)).toBeVisible();

    await page.locator('#loginCode').selectOption('S01');
    await page.locator('#loginPin').fill('INVALID-QA-PIN');
    await page.locator('#loginBtn').click();
    await expect(page.locator('#loginMsg')).toContainText(/ไม่ถูกต้อง|เข้าสู่ระบบไม่ได้/);
    await expect(page.locator('#app')).toHaveClass(/hidden/);
  });

  test('Coach page uses Thai-first research language and governed Evidence Inspector without VERIFIED student option', async ({ page }) => {
    const response = await page.goto('./coach.html', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'ผู้ช่วยวิจัย AI + ตัวตรวจหลักฐาน' })).toBeVisible();
    await expect(page.getByText(/รหัสผู้เรียน · Student Code/)).toBeVisible();
    await expect(page.getByText(/หลักฐานความตรง · Validity Evidence/)).toBeAttached();
    await expect(page.getByText(/หลักฐานความเที่ยง · Reliability Evidence/)).toBeAttached();
    await expect(page.locator('#login')).toBeVisible();
    await expect(page.locator('#app')).toHaveClass(/hidden/);
    const statuses = await page.locator('#evStatus option').allTextContents();
    expect(statuses).toEqual(['TO VERIFY', 'CANDIDATE', 'PARTIAL', 'CONTRADICTORY']);
    expect(statuses).not.toContain('VERIFIED');
  });

  test('Instructor console is Thai-first and preserves Human Academic Authority wording', async ({ page }) => {
    const response = await page.goto('./instructor.html', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /ห้องควบคุมอาจารย์/ })).toBeVisible();
    await expect(page.getByText(/รหัสเข้าใช้อาจารย์ · Instructor PIN/)).toBeVisible();
    await expect(page.getByText(/มอบหมายงาน → ส่งงาน → ให้ข้อเสนอแนะ → แก้ไขและส่งใหม่/)).toBeVisible();
    const html = await page.locator('body').innerText();
    expect(html).toContain('ส่งกลับเพื่อแก้ไข · Revision Required');
    expect(html).toContain('ขอหลักฐานเพิ่มเติม · Evidence Required');
    expect(html).toContain('ต้องการผู้เชี่ยวชาญทบทวน · Expert Review Required');
    expect(html).toContain('การเลือก Completed ไม่ใช่การอนุมัติจริยธรรม เครื่องมือวิจัย หรือผลการเรียนขั้นสุดท้าย');
    expect(html).toContain('WHAT → WHY → WHERE → HOW → NEXT ACTION');
  });

  test('Classroom API rejects unauthenticated assignment access', async ({ request }) => {
    const response = await request.post(API, { data: { action: 'listAssignments' } });
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
    const body = await response.json();
    expect(String(body.error || '')).toMatch(/SESSION_REQUIRED|INVALID|UNAUTHORIZED/i);
  });
});
