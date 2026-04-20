const { expect } = require('@playwright/test');

/**
 * Page Object Model for the Order Details View page.
 */
class ViewOrderPage {
    constructor(page) {
        this.page = page;
    }

    // Locates the specific Order ID label in the main content area
    orderIdLabel(orderId) {
        return this.page.locator(`div.col-text.-main:has-text("${orderId}")`);
    }

    /**
     * Validates that the correct Order ID is displayed on the page.
     * @param {string} orderId - The expected Order ID string.
     */
    async validateOrderId(orderId) {
        await expect(this.orderIdLabel(orderId)).toHaveText(orderId);
    }
}

module.exports = ViewOrderPage;