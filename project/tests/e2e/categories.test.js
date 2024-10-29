import { test, expect } from '@playwright/test';

// Lietotājs ievadījis nepareizu lietotāja informāciju
test('Admin lietotājs var pievienot kategorijas interneta veikalam', async ({ page }) => {
    await page.goto('http://localhost:8000/login');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('text=Pieslēgties');

    await page.click('text=Pievienot vai rediģēt kategorijas');

    await page.click('text=Pievienot jaunu kategoriju');

    await page.fill('#name', 'Gerberas');
    await page.fill('#description', 'skaisti ziedi');

    await page.click('text=Saglabāt kategoriju');

    const successMessage = await page.locator('text=Veiksmīgi pievienota jauna kategorija!').innerText();
    expect(successMessage).toContain('Veiksmīgi pievienota jauna kategorija!');
});