const { test, expect } = require('@playwright/test');

test('Screen Shots', async ({ page, browser }) => {

    //page.on('request', request => console.log(request.url()));
    //page.on('response', response => console.log(response.status()));
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill("rahulshettyacademy");
    await page.locator('input[type="password"]').fill("Learning@830$3mK2");
    await page.locator('input[value="user"]').check();
    await page.locator('.modal-body').waitFor();
    await page.getByRole('button', { name: /ok/i }).click();

    const weLogin = page.locator('input#terms');
    //Below two screen shots are not used for any comparison
    await page.screenshot({ path: 'FullLoginPageSS.png' });//Screen shot of whole page
    await weLogin.screenshot({ path: 'LoginBtnSS.png' });//Screen shot of locators.


    //Yesterday [i.e Some where in past] you run this TC and base line snapshot imapge is created by Playwright snapshot system # npx playwright test --update-snapshots # await expect(page).toHaveScreenshot()
    //Now you are re-running the same TC and taking screen shot and comparing it with yeterday's base line snapshot image.
    expect(await page.screenshot()).toMatchSnapshot("ExpectedImage.png");
    await weLogin.click();

});