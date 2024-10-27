import { test, expect } from '@playwright/test';

//Veikala skatā tiek izvadīti produkti
test('Veikala skatā tiek izvadīti produkti', async ({ page }) => {
    await page.goto('http://localhost:8000/shop');

    const productSelector = 'div.cursor-pointer'; 
    await page.waitForSelector(productSelector);

    const products = await page.$$(productSelector); 
    expect(products.length).toBeGreaterThan(0); 
});

//Lietotājs var apskatīt katru produktu atsevišķi
test('Lietotājs var apskatīt katru produktu atsevišķi', async ({ page }) => {
    await page.goto('http://localhost:8000/shop');

    const productSelector = 'div.cursor-pointer'; 
    await page.waitForSelector(productSelector);

    const firstProduct = await page.$(productSelector);
    await firstProduct.click();  

    const productName = '.product-name';
    const displayedName = await page.textContent(productName);

    expect(displayedName).not.toBeNull();
});

//Lietotājs nevar pievienot preci grozam, ja nav autentificējies
test('Lietotājs nevar pievienot preci grozam, jo nav pieslēdzies', async ({ page }) => {
    await page.goto('http://localhost:8000/shop');

    const productSelector = 'div.cursor-pointer';
    await page.waitForSelector(productSelector);
    const firstProduct = await page.$(productSelector);
    await firstProduct.click();

    const loginButton = '.login-button';
    await page.waitForSelector(loginButton);
    
    const isLoginVisible = await page.isVisible(loginButton);

    expect(isLoginVisible).toBe(true); 
});

//Lietotājs var pievienot preci grozam, ja ir autentificējies
test('Lietotājs var pievienot preci grozam', async ({ page }) => {
    await page.goto('http://localhost:8000/login');
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'password');
    await page.click('text=Pieslēgties');

    await page.waitForURL('http://localhost:8000/admin/admindashboard');

    await page.goto('http://localhost:8000/shop');

    const productSelector = 'div.cursor-pointer';
    await page.waitForSelector(productSelector);
    const firstProduct = await page.$(productSelector);
    await firstProduct.click();

    const addToCartButton = '.add-to-cart';
    await page.waitForSelector(addToCartButton);
    await page.click(addToCartButton);

    const popupModal = '.popup';
    await page.waitForSelector(popupModal);

    const popupText = await page.textContent(popupModal);
    expect(popupText).toContain('Pasūtījums veiksmīgi pievienots grozam!'); 
});