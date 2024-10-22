import { test, expect } from '@playwright/test';

function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 15); 
    return `${randomString}@gmail.com`; 
}

test('User can register', async ({ page }) => {
    await page.goto('http://localhost:8000/register'); 
    await page.fill('#name', 'John Doe');
    const randomEmail = generateRandomEmail();
    await page.fill('#email', randomEmail);
    await page.fill('#password', 'password');
    await page.fill('#password_confirmation', 'password');
    await page.click('text=Reģistrēties');
    await page.waitForURL('http://localhost:8000/dashboard');
    expect(page.url()).toBe('http://localhost:8000/dashboard');
  });