const { test, expect } = require('@playwright/test');

const URL = 'https://rahulshettyacademy.com/loginpagePractise/';

async function loginFlow(page) {
    await page.goto(URL);
    await page.locator('input#username').fill("rahulshettyacademy");
    await page.locator('input[type="password"]').fill("Learning@830$3mK2");
    await page.locator('input[value="user"]').check();
    await page.locator('.modal-body').waitFor();
    await page.getByRole('button', { name: /ok/i }).click();
    await page.locator('input#terms').click();
}


// -------------------- TC 2A --------------------
test('TC 2A - Normal Login Flow', async ({ page }) => {

    await loginFlow(page);

    await page.locator('input.btn.btn-info.btn-md').click();
    await page.waitForTimeout(2000);

    expect(await page.title()).toBeTruthy();
});


// -------------------- TC 2B --------------------
test('TC 2B - Block CSS Files', async ({ page }) => {

    // ✔ Block CSS BEFORE navigation
    await page.route('**/*.css', route => route.abort());

    await loginFlow(page);

    await page.locator('input.btn.btn-info.btn-md').click();
    await page.waitForTimeout(2000);

    console.log("CSS blocked successfully - UI should appear unstyled");
});


// -------------------- TC 2C --------------------
test('TC 2C - Block CSS + Images', async ({ page }) => {

    // ✔ Block assets BEFORE navigation
    await page.route('**/*.{css,jpg,png}', route => route.abort());

    await loginFlow(page);

    await page.locator('input.btn.btn-info.btn-md').click();
    await page.waitForTimeout(2000);

    console.log("CSS + Images blocked - UI heavily degraded expected");
});