## Project Overview
This repository contains Cypress UI automation tests written in JavaScript to validate user-facing flows on public web pages, including content checks, UI behaviors, and shopping/cart interactions.

## Tech Stack
- Node.js
- Cypress ^15.9.0
- JavaScript

## Installation Instructions
```bash
git clone https://github.com/vladsuciu26/automation-ui-tests.git
cd automation-ui-tests
npm install
```

## Run Instructions
Interactive mode:
```bash
npx cypress open
```

Headless mode:
```bash
npx cypress run
```

## Project Structure
```
cypress/
  e2e/
  pages/
  fixtures/
  support/
```
- `cypress/e2e` – Spec files grouped by test areas.
- `cypress/pages` – Page Object Model (POM) classes for page-level actions and selectors.
- `cypress/fixtures` – JSON test data used for data-driven scenarios.
- `cypress/support` – Custom commands and shared setup (e.g., `commands.js`, `e2e.js`).

The project applies the Page Object Model to centralize selectors and actions, uses fixtures for repeatable data-driven checks, and exposes reusable commands for common behaviors.

## Testing Approach
- **Page Object Model** – Encapsulates page interactions to keep tests readable and maintainable.
- **Custom Cypress commands** – Shared helpers (e.g., scroll locking and page-position checks) to reduce duplication.
- **Data-driven testing** – Fixtures drive validation of UI content and attributes.
- **Negative testing** – Uses negative assertions (e.g., not empty, not transparent, or absence of unexpected values) to strengthen checks.

## Notes / Assumptions
- Prefer stable selectors such as `data-testid` when available.
- Assertions prioritize stability and user-visible behavior over fragile UI-only checks.
