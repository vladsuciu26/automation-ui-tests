export class AirportLabHomePage {
  elements = {};

  visit() {
    cy.visit("https://airportlabs.com/");
    cy.wait(1000); // Wait for 1 second to ensure the page loads
  }

  getEcosystemSectionTitle() {
    return cy.contains("h2", /The AirportLabs Ecosystem/i).scrollIntoView();
  }

  getActivityInNumbersSection() {
    return cy.contains("h2", /Our activity in numbers/i).closest(".our-impact").scrollIntoView();
  }

  getStatisticByLabel(label) {
    return this.getActivityInNumbersSection()
      .contains("h4, h3", label)
      .closest(".div-block-24");
  }

  getStatisticValue(label) {
    return this.getStatisticByLabel(label).find("h2");
  }

  getStatisticLabel(label) {
    return this.getStatisticByLabel(label).find("h4, h3");
  }
}
