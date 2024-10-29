// import { test, expect } from '@playwright/test';

// // Lietotājs ievadījis nepareizu lietotāja informāciju
// test('Admin lietotājs var pievienot preci interneta veikalam', async ({ page }) => {
//     await page.goto('http://localhost:8000/login');
//     await page.fill('#email', 'admin@example.com');
//     await page.fill('#password', 'password');
//     await page.click('text=Pieslēgties');

//     await page.click('text=Pievienot vai rediģēt produktu')

//     const categoryButton = '.category-button';
//     await page.waitForSelector(categoryButton);
//     await page.click(categoryButton);

//     const newProduct = '.new-product';
//     await page.waitForSelector(newProduct);
//     await page.click(newProduct);

//     await page.fill('#name', 'ziedi');
//     await page.fill('#description', 'skaisti ziedi');
//     await page.fill('#price', '3');
//     await page.click('text=Pieejams');
//     await page.fill('#quantity', '20');
//     const categoryId = '1'; 
//     await page.selectOption('.categories-select', categoryId);

//     const imageSelector = '.image';
//     await page.waitForSelector(imageSelector);
//     await page.click(imageSelector);

//     await page.click('text=Pievienot produktu');

//     const successMessage = await page.locator('text=Produkts veiksmīgi pievienots!').innerText();
//     expect(successMessage).toContain('Produkts veiksmīgi pievienots!');
// });