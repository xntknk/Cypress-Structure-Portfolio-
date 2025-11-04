# E2E Test (Cypress)

This project contains **End-to-End (E2E)** test cases written in **Cypress** to verify the complete user journey through the browser. It follows a modular structure using the **Page Object Model (POM)** to keep tests clean, maintainable, and reusable.

---

## 🚀 Prerequisites

Before running, ensure you have:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

Check versions:

```bash
node -v
npm -v
```

---

## 📦 Installation

Install dependencies:

```bash
npm install
```

If the project is separate from the main frontend/backend, run this command inside the Cypress test folder that contains `package.json`.

---

## ▶️ Running Tests

### 1) Run with Cypress UI
For debugging or inspecting tests interactively:

```bash
npx cypress open
```

Select **E2E Testing** and choose your preferred spec.

### 2) Run Headless (for CI or automation)
For fast local or CI runs:

```bash
npx cypress run
```

To specify browser:

```bash
npx cypress run --browser chrome
```

---

## 🏗 Project Structure

Typical Cypress + POM structure:

```text
cypress/
  e2e/                     # Test files (.cy.js / .cy.ts)
    login.cy.js
    exam/
      generate-exam.cy.js

  fixtures/                # Static test data (JSON)
    user.json

  pageObjects/             # Page Object Model classes (selectors + actions)
    LoginPage.js
    DashboardPage.js
    ExamPage.js

  support/
    commands.js            # Custom commands (e.g., cy.login())
    e2e.js                 # Runs before every test

cypress.config.js          # Cypress configuration (baseUrl, viewport, env)
package.json
```

> Each page class in `pageObjects/` represents a part of the app and contains reusable selectors and methods for interacting with UI elements.

---

## 🧩 Page Object Model (POM)

The **Page Object Model** helps keep test code organized by separating UI logic from test logic.

### Example: Login Page Object

```js
// cypress/pageObjects/LoginPage.js
class LoginPage {
  elements = {
    username: () => cy.get('[data-cy="username"]'),
    password: () => cy.get('[data-cy="password"]'),
    loginBtn: () => cy.get('[data-cy="login-btn"]')
  };

  visit() {
    cy.visit("/login");
  }

  login(username, password) {
    this.elements.username().type(username);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
  }
}

module.exports = new LoginPage();
```

### Example: Using POM in a test

```js
// cypress/e2e/login.cy.js
import LoginPage from "../pageObjects/LoginPage";

describe("Login flow", () => {
  it("should login with valid credentials", () => {
    LoginPage.visit();
    LoginPage.login(Cypress.env("username"), Cypress.env("password"));
    cy.url().should("include", "/dashboard");
  });
});
```

This approach makes it easy to maintain tests even if the UI changes.

---

## ⚙️ Configuration (optional)

If your project uses multiple environments (e.g., Dev, Staging), define them in `cypress.config.js`:

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev.your-app.com",
    env: {
      username: "testuser",
      password: "P@ssw0rd",
    },
    setupNodeEvents(on, config) {
      // Custom events
    },
  },
});
```

Then use environment variables directly in tests or page objects:

```js
cy.visit("/");
cy.get("#username").type(Cypress.env("username"));
```

---

## 🛠 Continuous Integration (Basic Setup)

Example workflow for **GitHub Actions**:

```yaml
name: Cypress E2E

on:
  push:
    branches: [ main, dev ]
  pull_request:

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run Cypress tests
        run: npx cypress run --browser chrome --headless
```

**Explanation:**
- `on:` specifies when to run (push or PR).
- `checkout` fetches repository code.
- `setup-node` prepares Node.js environment.
- `npm install` installs dependencies.
- `npx cypress run` executes all tests headlessly.

Sensitive information (like credentials) should be stored in **GitHub Secrets** and referenced in CI configuration.

---

## 🧑‍💻 Recommended Scripts (package.json)

Add useful npm scripts:

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test": "cypress run"
  }
}
```

Run them easily:

```bash
npm run cy:open
# or
npm run cy:run
```

---

## ✅ Summary

- Use `npm install` to install dependencies.  
- Use `npx cypress open` for interactive testing.  
- Use `npx cypress run` for headless or CI runs.  
- Organized with **Page Object Model (POM)** under `cypress/pageObjects/`.  
- Includes GitHub Actions workflow example for CI integration.
