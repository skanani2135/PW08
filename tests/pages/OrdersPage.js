const { expect } = require('@playwright/test');

/**
 * Page Object Model for the Orders Dashboard where all user orders are listed.
 */
class OrdersPage {
    constructor(page) {
        this.page = page;

        // Locator for the button that navigates back to the product listing
        this.goBackToShopBtn =
            page.getByRole('button', { name: 'Go Back to Shop' });

        // Dynamic locator: Finds the table row (tr) containing a specific order ID text
        this.orderRow = (orderId) =>
            page.locator('tr').filter({
                has: page.locator(`text=${orderId}`)
            });

        // Dynamic locator: Finds the 'View' button specifically for a given order ID
        this.viewButton = (orderId) =>
            page.locator('tr')
                .filter({ has: page.locator(`text=${orderId}`) })
                .getByRole('button', { name: 'View' });

        // Locator for the order ID text displayed within detail views
        this.orderIdLabel = (orderId) =>
            page.locator(`div.col-text.-main:has-text("${orderId}")`);
    }

    /**
     * Navigates directly to the My Orders page URL.
     */
    async openOrdersPage() {
        await this.page.goto(
            "https://rahulshettyacademy.com/client/#/dashboard/myorders"
        );
    }

    /**
     * Clicks the View button for a specific order to open its details.
     * @param {string} orderId - The ID of the order to be opened.
     */
    async openOrder(orderId) {
        await this.viewButton(orderId).click();
    }
}

module.exports = OrdersPage;