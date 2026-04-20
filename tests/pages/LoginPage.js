/**
 * LoginPage - Page Object Model for Sauce Labs Login Page
 *
 * This class encapsulates all interactions with the login page of Sauce Labs demo.
 * It provides methods for entering credentials and submitting the login form.
 */

class LoginPage {
  /**
   * Constructor
   * @param {Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;

    // Selectors
    this.usernameInput = '[data-test="username"]';
    this.passwordInput = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.loginForm = '[data-test="login-form"]';
  }

  /**
   * Navigate to the login page
   * @param {string} baseURL - Base URL of the application
   */
  async navigateToLoginPage(baseURL) {
    await this.page.goto(baseURL);
  }

  /**
   * Check if login form is visible
   * @returns {boolean} True if login form is visible
   */
  async isLoginFormVisible() {
    return await this.page.locator(this.loginForm).isVisible();
  }

  /**
   * Enter username in the username field
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    await this.page.locator(this.usernameInput).fill(username);
  }

  /**
   * Enter password in the password field
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    await this.page.locator(this.loginButton).click();
  }

  /**
   * Perform login with provided credentials
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Verify username field contains the correct value
   * @param {string} username - Expected username
   * @returns {boolean} True if username matches
   */
  async verifyUsernameValue(username) {
    return await this.page.locator(this.usernameInput).inputValue() === username;
  }

  /**
   * Verify password field contains the correct value
   * @param {string} password - Expected password
   * @returns {boolean} True if password matches
   */
  async verifyPasswordValue(password) {
    return await this.page.locator(this.passwordInput).inputValue() === password;
  }
}

module.exports = LoginPage;
