import { test, expect } from '@playwright/test';

function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 15); 
    return `${randomString}@gmail.com`; 
}

function generateInvalidEmail() {
    const randomString = Math.random().toString(36).substring(2, 15); 
    return `${randomString}@gmail`; 
}

test('Lietotājs nevar reģistrēties ar tukšiem ievadlaukiem', async ({ page }) => {
    await page.goto('http://localhost:8000/register');
  
    await page.click('text=Reģistrēties');
    await page.waitForSelector('text=Ievadlauks vārds ir jāaizpilda obligāti.');
    await page.waitForSelector('text=Ievadlauks e-pasta adrese ir jāaizpilda obligāti.');
    await page.waitForSelector('text=Ievadlauks parole ir jāaizpilda obligāti.');
  
    const errorNameMessage = await page.locator('text=Ievadlauks vārds ir jāaizpilda obligāti.').innerText();
    const errorEmailMessage = await page.locator('text=Ievadlauks e-pasta adrese ir jāaizpilda obligāti.').innerText();
    const errorPasswordMessage = await page.locator('text=Ievadlauks parole ir jāaizpilda obligāti.').innerText();

    expect(errorNameMessage).toBe('Ievadlauks vārds ir jāaizpilda obligāti.');
    expect(errorEmailMessage).toBe('Ievadlauks e-pasta adrese ir jāaizpilda obligāti.');
    expect(errorPasswordMessage).toBe('Ievadlauks parole ir jāaizpilda obligāti.');
});

test('Lietotājs nevar reģistrēties ar nederīgu e-pasta adresi', async ({ page }) => {
    await page.goto('http://localhost:8000/register');

    const invalidEmail = generateInvalidEmail();
    await page.fill('#email', invalidEmail);
    await page.click('text=Reģistrēties');

    await page.waitForSelector('text=E-pasta adrese ir jābūt derīgai ar pareizu domēnu (piemēram, piemērs.com).');

    const errorEmailMessage = await page.locator('text=E-pasta adrese ir jābūt derīgai ar pareizu domēnu (piemēram, piemērs.com).').innerText();

    expect(errorEmailMessage).toBe('E-pasta adrese ir jābūt derīgai ar pareizu domēnu (piemēram, piemērs.com).');

});

test('Lietotājs nevar reģistrēties, ja vārda kritēriji netiek izpildīti', async ({ page }) => {
    await page.goto('http://localhost:8000/register');
  
    await page.fill('#name', 'Jo');
    await page.click('text=Reģistrēties');

    await page.waitForSelector('text=Vārds nedrīkst būt īsāks par 3 rakstzīmēm.');

    const errorNameMessage = await page.locator('text=Vārds nedrīkst būt īsāks par 3 rakstzīmēm.').innerText();

    expect(errorNameMessage).toBe('Vārds nedrīkst būt īsāks par 3 rakstzīmēm.');
});

test('Lietotājs nevar reģistrēties, ja e-pasta adrese jau ir aizņemta', async ({ page }) => {
    await page.goto('http://localhost:8000/register');

    await page.fill('#email', 'admin@example.com');
    await page.click('text=Reģistrēties');

    await page.waitForSelector('text=e-pasta adrese ir jau aizņemta.');

    const errorEmailMessage = await page.locator('text=e-pasta adrese ir jau aizņemta.').innerText();

    expect(errorEmailMessage).toBe('e-pasta adrese ir jau aizņemta.');

});

test('Lietotājs nevar reģistrēties, ja paroles kritēriji netiek izpildīti', async ({ page }) => {
    await page.goto('http://localhost:8000/register');

    await page.fill('#password', 'pass');
    await page.fill('#password_confirmation', 'pass');
    await page.click('text=Reģistrēties');

    await page.waitForSelector('text=Ievadlaukā parole nedrīkst būt mazāk par 8 rakstzīmēm.');

    const errorPasswordMessage = await page.locator('text=Ievadlaukā parole nedrīkst būt mazāk par 8 rakstzīmēm.').innerText();

    expect(errorPasswordMessage).toBe('Ievadlaukā parole nedrīkst būt mazāk par 8 rakstzīmēm.');

});

test('Lietotājs nevar reģistrēties, ja paroles nesakrīt', async ({ page }) => {
    await page.goto('http://localhost:8000/register');

    await page.fill('#password', 'password');
    await page.fill('#password_confirmation', 'passvord');
    await page.click('text=Reģistrēties');

    await page.waitForSelector('text=Lauki parole nesakrīt.');

    const errorPasswordMessage = await page.locator('text=Lauki parole nesakrīt.').innerText();

    expect(errorPasswordMessage).toBe('Lauki parole nesakrīt.');

});

test('Lietotājs veiksmīgi var reģistrēties', async ({ page }) => {
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