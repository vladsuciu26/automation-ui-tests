export class AirportLabHomePage {
  elements = {};

  visit() {
    cy.visit("https://airportlabs.com/");
    cy.wait(1000); // Wait for 1 second to ensure the page loads
  }

  getEcosystemSectionTitle() {
    return cy.contains("h2", /The AirportLabs Ecosystem/i).scrollIntoView();
  }
}
