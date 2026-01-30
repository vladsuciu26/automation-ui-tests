// Cypress.Commands.add("lockScrollToTop", () => {
//   cy.window().then((win) => {
//     win.addEventListener("scroll", () => win.scrollTo(0, 0), { passive: true });
//   });
// });

Cypress.Commands.add("ensureTop", () => {
  cy.window().then((win) => win.scrollTo(0, 0));
  cy.window().its("scrollY").should("eq", 0);
});

Cypress.Commands.add('lockScrollToTop', () => {
  cy.window().then(win => {
    win.addEventListener(
      'scroll',
      () => win.scrollTo(0, 0),
      { passive: true }
    );
  });
});