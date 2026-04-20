const { expect } = require('@playwright/test');

class APIUtils {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async generateTokenAPI(url, payload) {

        const apiLoginResponse = await this.apiContext.post(url, {
            data: payload
        });

        expect(apiLoginResponse.ok()).toBeTruthy();
        console.log("Status Code:", apiLoginResponse.status());
        console.log("Status Text:", apiLoginResponse.statusText());
        const apiLoginResponseBody = await apiLoginResponse.json();
        console.log("Login Response Body:\n", JSON.stringify(apiLoginResponseBody, null, 2));
        console.log("API Token Generated:", apiLoginResponseBody.token);
        return apiLoginResponseBody;
    }

    async createOrderAPI(url, payload, token) {
        const apiCreateOrderResponse = await this.apiContext.post(url, {
            data: payload,
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        });
        expect(apiCreateOrderResponse.ok()).toBeTruthy();
        console.log("Status Code:", apiCreateOrderResponse.status());
        console.log("Status Text:", apiCreateOrderResponse.statusText());
        const apiCreateOrderResponseBody = await apiCreateOrderResponse.json();
        console.log("apiCreate Order Response:\n", JSON.stringify(apiCreateOrderResponseBody, null, 2));
        return apiCreateOrderResponseBody;
    }

}
module.exports = APIUtils;