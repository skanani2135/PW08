const { test, expect } = require('@playwright/test');

test('TC 3A - Execute UI Flow and Print Response Data', async ({ page, browser }) => {

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.status()));
    // Navigate to the target URL
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill("rahulshettyacademy");
    await page.locator('input[type="password"]').fill("Learning@830$3mK2");
    await page.locator('input[value="user"]').check();
    await page.locator('.modal-body').waitFor();
    await page.getByRole('button', { name: /ok/i }).click();
    //await page.screenshot({ path: 'screenshot.png' });//Screen shot of whole page
    const weLogin = page.locator('input#terms');
    //await weLogin.screenshot({ path: 'loginScreenShot.png' });
    await weLogin.click();
});