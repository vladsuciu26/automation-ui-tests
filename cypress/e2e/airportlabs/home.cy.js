import { AirportLabHomePage } from "../../pages/AirportLabHomePage";

const airportLabHomePage = new AirportLabHomePage();

describe("AirportLabs Home Page", () => {
  beforeEach(() => {
    airportLabHomePage.visit();
  });

  it("should validate desktop view", () => {
    cy.viewport(1920, 1080);
  });

  it("should display the ecosystem section title", () => {
    airportLabHomePage
      .getEcosystemSectionTitle()
      .should("be.visible")
      // Validate text content (ignoring case and whitespace)
      .and("contain.text", "The AirportLabs Ecosystem")
      .and("contain.text", "tailored to your operational needs");
  });

  it("should have correct CSS properties for the ecosystem section title", () => {
    airportLabHomePage
      .getEcosystemSectionTitle()
      .and("have.css", "font-size", "40px")
      .invoke("css", "font-weight")
      .then((fontWeight) => {
        expect(Number(fontWeight)).to.equal(300);
      });
  });

  it("should not have transparent color for the ecosystem section title", () => {
    airportLabHomePage
      .getEcosystemSectionTitle()
      .should("not.have.css", "color", "rgba(0, 0, 0, 0)");
  });

  it("should validate mobile portrait view", () => {
    cy.viewport("iphone-x");

    airportLabHomePage
      .getEcosystemSectionTitle()
      .should("be.visible")
      .and((element) => {
        // Width should not overflow viewport width (375px for iPhone X)
        expect(element.width()).to.be.lessThan(376);
      });
  });

  it("should validate mobile landscape view", () => {
    cy.viewport("iphone-x", "landscape");

    airportLabHomePage
      .getEcosystemSectionTitle()
      .scrollIntoView()
      .should("be.visible")
      .and((element) => {
        expect(element.width()).to.be.greaterThan(375);
        expect(element.width()).to.be.lessThan(813);
      });
  });

  it("should validate statistics section", () => {
    cy.fixture("statistics").then((stats) => {
      const { value, label, color } = stats.airportsWorldwide;

      airportLabHomePage
        .getStatisticValue(label)
        .should("be.visible")
        .and("contain.text", value)
        .and("have.css", "color", color);

      airportLabHomePage
        .getStatisticLabel(label)
        .should("be.visible")
        .and("have.text", label);
    });
  });

  it.only("should validate statistic values are not empty", () => {
    cy.fixture("statistics").then((stats) => {
      const { label } = stats.airportsWorldwide;

      airportLabHomePage
        .getStatisticValue(label)
        .should("not.be.empty")
        .and("not.have.text", "");
    });
  });
});
