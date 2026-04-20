const { test, expect, request } = require('@playwright/test');

let orderID; // ✅ Shared between tests

// -------------------- TC1A --------------------
test('TC 1A - Create Order (User 1)', async ({ page }) => {

    const apiContext = await request.newContext();

    // Login User 1
    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: {
                userEmail: "sandip1.qa@gmail.com",
                userPassword: "Abcd@1234"
            }
        }
    );

    expect(loginResponse.ok()).toBeTruthy();
    const loginJson = await loginResponse.json();
    const token = loginJson.token;

    // Inject token
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    // Create Order
    const createOrderResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: {
                orders: [
                    {
                        country: "Cuba",
                        productOrderedId: "6960eae1c941646b7a8b3ed3"
                    }
                ]
            },
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        }
    );

    expect(createOrderResponse.ok()).toBeTruthy();
    const orderResponseJson = await createOrderResponse.json();
    orderID = orderResponseJson.orders[0];

    console.log("Order ID (Shared):", orderID);

    // UI Validation (User 1)
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator("button:has-text('View')").first().click();
    await page.getByRole('button', { name: "Sign Out" }).click();
});


// -------------------- TC1B --------------------
test('TC 1B - Validate Order with User 2', async ({ page }) => {

    const apiContext = await request.newContext();

    // Login User 2
    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: {
                userEmail: "sharingac1234@gmail.com",
                userPassword: "Abcd@1234"
            }
        }
    );

    expect(loginResponse.ok()).toBeTruthy();
    const loginJson = await loginResponse.json();
    const token = loginJson.token;

    // Inject token
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    // UI Validation
    await page.getByRole('button', { name: 'ORDERS' }).click();

    const orginalURL = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*";
    const urlWithFakeOrderID = `https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${orderID}`;

    await page.route(orginalURL, route =>
        route.continue({ url: urlWithFakeOrderID })
    );

    await page.locator("button:has-text('View')").first().click();
});