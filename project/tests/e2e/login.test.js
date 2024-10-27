// import { test, expect } from '@playwright/test';

// // Lietotājs ievadījis nepareizu lietotāja informāciju
// test('Lietotājs nevar pieslēgties ar nederīgu lietotāja informāciju', async ({ page }) => {
//     await page.goto('http://localhost:8000/login');
//     await page.fill('#email', 'random@gmail.com');
//     await page.fill('#password', 'password');
//     await page.click('text=Pieslēgties');
    
//     const errorMessage = await page.locator('text=Mūsu datubāzē nav šādu datu.').innerText();
//     expect(errorMessage).toContain('Mūsu datubāzē nav šādu datu.');
// });

// //Lietotājs atstājis tukšus ievadlaukus
// test('Lietotājs nevar pieslēgties ar tukšiem ievadlaukiem', async ({ page }) => {
//   await page.goto('http://localhost:8000/login');
  
//   await page.fill('#email', '');
//   await page.fill('#password', '');
//   await page.click('text=Pieslēgties');

//   await page.waitForSelector('text=Ievadlauks e-pasta adrese ir jāaizpilda obligāti.');
//   await page.waitForSelector('text=Ievadlauks parole ir jāaizpilda obligāti.');

//   const errorEmailMessage = await page.locator('text=Ievadlauks e-pasta adrese ir jāaizpilda obligāti.').innerText();
//   const errorPasswordMessage = await page.locator('text=Ievadlauks parole ir jāaizpilda obligāti.').innerText();

//   expect(errorEmailMessage).toBe('Ievadlauks e-pasta adrese ir jāaizpilda obligāti.');
//   expect(errorPasswordMessage).toBe('Ievadlauks parole ir jāaizpilda obligāti.');
// });


// // Lietotājs veiksmīgi pieslēdzies
// test('Lietotājs veiksmīgi var pieslēgties', async ({ page }) => {
//     await page.goto('http://localhost:8000/login');
//     await page.fill('#email', 'admin@example.com');
//     await page.fill('#password', 'password');
//     await page.click('text=Pieslēgties');

//     await page.waitForURL('http://localhost:8000/admin/admindashboard');
//     expect(page.url()).toBe('http://localhost:8000/admin/admindashboard');
// });
