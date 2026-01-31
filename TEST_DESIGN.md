## Structure & Architecture Decisions
The project separates concerns by keeping test specs under `cypress/e2e`, page interactions under `cypress/pages`, data in `cypress/fixtures`, and shared commands in `cypress/support`. Page Object Model (POM) classes encapsulate selectors and page actions, which keeps specs focused on intent rather than DOM details. This structure improves readability, reduces duplication, and supports scalability as more flows and pages are added. Centralizing actions and selectors makes future updates cheaper and encourages consistent conventions across tests.

## Improvements With 2 Additional Hours
- Add a small set of targeted negative scenarios (e.g., missing elements, empty data states, and boundary validations) to improve coverage without expanding scope.
- Replace fixed `cy.wait` calls with condition-based waits to reduce flakiness and speed up runs.
- Strengthen selector strategy by preferring stable attributes (e.g., `data-testid`) in page objects where available, minimizing reliance on dynamic classes.
- Introduce basic `cy.intercept` stubbing for the most dynamic endpoints to improve determinism on public pages.
- Add a minimal CI workflow to run headless tests on push for fast feedback.

## Maintainability: Stable vs Fragile Areas
**Easy / Stable to Maintain**
- POM-based selectors and actions in `cypress/pages`, which localize updates when UI changes.
- Fixture-driven validations for structured data, which keep expected values centralized and easy to adjust.
- Custom commands in `cypress/support` that standardize repetitive behaviors.

**Fragile / High Maintenance**
- Assertions based on CSS styling (e.g., exact font size/weight or color), which are sensitive to design changes.
- Flows that depend on dynamic product listings, sorting, and pricing data, which can change frequently on public sites.
- Tests that rely on timing (`cy.wait`) rather than observable UI states, increasing the risk of flaky failures.

Risk is managed by keeping selectors centralized in POM classes, using fixtures for expected content, and scoping assertions to user-visible behavior where possible.
