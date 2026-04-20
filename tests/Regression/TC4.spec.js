const { test, expect } = require('@playwright/test');

/**
 * Reusable method to intercept and log Request details.
 */
async function interceptRequest(page, logArray) {
    page.on('request', async (request) => {
        const headers = await request.headers();
        let body = "N/A";

        if (request.method() !== 'GET') {
            try {
                body = request.postDataJSON() || request.postData() || "Empty";
            } catch (e) { body = "Parse Error"; }
        }

        logArray.push({
            type: 'REQUEST',
            url: request.url(),
            method: request.method(),
            authToken: headers['authorization'] || 'None',
            payload: body,
            timestamp: new Date().toLocaleTimeString()
        });
    });
}

/**
 * Reusable method to intercept and log Response details.
 */
async function interceptResponse(page, logArray) {
    page.on('response', async (response) => {
        const contentType = response.headers()['content-type'] || '';
        let resBody = "N/A";

        if (response.status() < 400 && (contentType.includes('json') || contentType.includes('text'))) {
            try {
                resBody = await response.json();
            } catch (e) {
                try { resBody = await response.text(); } catch (err) { resBody = "Unreadable"; }
            }
        }

        logArray.push({
            type: 'RESPONSE',
            url: response.url(),
            status: response.status(),
            statusText: response.statusText(),
            data: resBody,
            timestamp: new Date().toLocaleTimeString()
        });
    });
}

/**
 * Common UI Flow (reusable)
 */
async function performLoginFlow(page) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill("rahulshettyacademy");
    await page.locator('input[type="password"]').fill("Learning@830$3mK2");
    await page.locator('input[value="user"]').check();
    await page.locator('.modal-body').waitFor();
    await page.getByRole('button', { name: /ok/i }).click();
    await page.locator('input#terms').click();
    await page.waitForLoadState('networkidle');
}


// -------------------- TC 4A --------------------
test('TC 4A - Capture Requests Only', async ({ page }) => {
    const networkLog = [];

    await interceptRequest(page, networkLog);
    await performLoginFlow(page);

    const requests = networkLog.filter(e => e.type === 'REQUEST');

    console.log(`\nCaptured ${requests.length} REQUESTS\n`);
    requests.forEach(r => {
        console.log(`📤 ${r.method} ${r.url}`);
    });

    expect(requests.length).toBeGreaterThan(0);
});


// -------------------- TC 4B --------------------
test('TC 4B - Capture Responses Only', async ({ page }) => {
    const networkLog = [];

    await interceptResponse(page, networkLog);
    await performLoginFlow(page);

    const responses = networkLog.filter(e => e.type === 'RESPONSE');

    console.log(`\nCaptured ${responses.length} RESPONSES\n`);
    responses.forEach(r => {
        console.log(`📥 ${r.status} ${r.url}`);
    });

    expect(responses.length).toBeGreaterThan(0);
});


// -------------------- TC 4C --------------------
test('TC 4C - Full Network Lifecycle Capture', async ({ page }) => {
    const networkLog = [];

    await interceptRequest(page, networkLog);
    await interceptResponse(page, networkLog);
    await performLoginFlow(page);

    console.log(`\nCaptured ${networkLog.length} TOTAL EVENTS\n`);

    networkLog.forEach((item) => {
        const icon = item.type === 'REQUEST' ? '📤' : '📥';
        console.log(`${icon} ${item.type}: ${item.url}`);
    });

    expect(networkLog.length).toBeGreaterThan(0);
});