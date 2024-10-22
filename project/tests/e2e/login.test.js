import { test, expect } from '@playwright/test';

test('User can login', async ({ page }) => {
    await page.goto('http://localhost:8000/login'); 
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('text=Pieslēgties');
    await page.waitForURL('http://localhost:8000/admin/admindashboard');
    expect(page.url()).toBe('http://localhost:8000/admin/admindashboard');
  });