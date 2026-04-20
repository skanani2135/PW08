const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Screen Shots', async ({ page }) => {

    const screenshotDir = path.join(
        __dirname,
        '..',
        '..',
        'tests',
        'AllScreenShots'
    );

    // Ensure folder exists
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await page.locator('input#username').fill("rahulshettyacademy");
    await page.locator('input[type="password"]').fill("Learning@830$3mK2");
    await page.locator('input[value="user"]').check();

    await page.locator('.modal-body').waitFor();
    await page.getByRole('button', { name: /ok/i }).click();

    const weLogin = page.locator('input#terms');

    // Full page screenshot
    await page.screenshot({
        path: path.join(screenshotDir, 'FullLoginPageSS.png'),
        fullPage: true
    });

    // Element screenshot
    await weLogin.screenshot({
        path: path.join(screenshotDir, 'LoginBtnSS.png')
    });

    //expect(await page.screenshot()).toMatchSnapshot("ExpectedImage.png");

    await weLogin.click();
});