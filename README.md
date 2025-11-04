# E2E Test (Cypress)

This project contains **End-to-End (E2E)** test cases written in **Cypress** to verify the full user flow through the browser. It is designed for QA and developers to validate core functionality before deployment and can be integrated with CI pipelines.

---

## 🚀 Prerequisites

Before running, ensure that you have:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (included with Node.js)

Check versions:

```bash
node -v
npm -v
```

---

## 📦 Installation

Install all dependencies:

```bash
npm install
```

If the project is part of a larger frontend/backend repo, run this command inside the Cypress test folder that contains `package.json`.

---

## ▶️ Running Tests

### 1) Run with Cypress UI
For debugging and visual inspection:

```bash
npx cypress open
```

Then select **E2E Testing** and choose your preferred spec.

### 2) Run Headless (for CI or automation)
For running in CI environments or fast local runs:

```bash
npx cypress run
```

Specify browser if needed:

```bash
npx cypress run --browser chrome
```

---

## 🏗 Project Structure

Typical Cypress folder structure:

```text
cypress/
  e2e/                 # Test files (.cy.js / .cy.ts)
    login.cy.js
    exam/
      generate-exam.cy.js
  fixtures/            # Static test data (JSON)
    user.json
  support/
    commands.js        # Custom commands (e.g., cy.login())
    e2e.js             # Runs before every test
cypress.config.js      # Cypress configuration (baseUrl, viewport, env)
package.json
```

> You can organize files in `cypress/e2e/` by feature/module (e.g., `auth/`, `dashboard/`, `cms/`) for better readability.

---

## ⚙️ Configuration (optional)

If the project supports multiple environments (e.g., Dev, Staging), configure them in `cypress.config.js`:

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
      // ...
    },
  },
});
```

Usage example in test:

```js
cy.visit("/");
cy.get("#username").type(Cypress.env("username"));
```

---

## 🧪 Example Test

```js
describe("Login flow", () => {
  it("should login with valid credentials", () => {
    cy.visit("/");
    cy.get('[data-cy="username"]').type(Cypress.env("username"));
    cy.get('[data-cy="password"]').type(Cypress.env("password"));
    cy.get('[data-cy="login-btn"]').click();
    cy.url().should("include", "/dashboard");
  });
});
```

---

## 🛠 Continuous Integration (Basic Setup)

You can integrate Cypress with GitHub Actions (or any CI system).  
Here’s a minimal example of a GitHub Actions workflow:

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
- `on:` defines when to run tests (on push or PR).
- `checkout` fetches your code.
- `setup-node` sets up Node.js.
- `npm install` installs dependencies.
- `npx cypress run` executes the E2E tests.

For sensitive data (e.g., credentials), store them as **GitHub Secrets** and reference them in the workflow instead of hardcoding.

---

## 🧑‍💻 Recommended Scripts (package.json)

To simplify commands, add this section to your `package.json`:

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test": "cypress run"
  }
}
```

Then you can run:

```bash
npm run cy:open
# or
npm run cy:run
```

---

## ✅ Summary

- Use `npm install` to install dependencies.
- Use `npx cypress open` to debug visually.
- Use `npx cypress run` to run tests headlessly or in CI.
- Cypress follows a clear folder structure under `cypress/`.
- CI integration example provided for GitHub Actions.
