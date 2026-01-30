import { AirportLabHomePage } from "../../pages/AirportLabHomePage";

const airportLabHomePage = new AirportLabHomePage();

describe("AirportLabs Home Page - Ecosystem Section", () => {
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
});

describe("AirportLabs Home Page - Activity in Numbers Section", () => {
  beforeEach(() => {
    airportLabHomePage.visit();
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

  it("should validate statistic values are not empty", () => {
    cy.fixture("statistics").then((stats) => {
      const { label } = stats.airportsWorldwide;

      airportLabHomePage
        .getStatisticValue(label)
        .should("not.be.empty")
        .and("not.have.text", "");
    });
  });
});

describe("AirportLabs Home Page - Social Media Links", () => {
  beforeEach(() => {
    airportLabHomePage.visit();
  });

  it("should validate social media links in the footer", () => {
    cy.fixture("socialMedia").then((socialLinks) => {
      socialLinks.forEach((link) => {
        airportLabHomePage
          .getFooterSocialLink(link.platform)
          .should("be.visible")
          // Verify the exact URL matches the requirement
          .and("have.attr", "href", link.url)
          // Verify it opens in a new tab
          .and("have.attr", "target", "_blank")
          // Verify the href contains the expected domain
          .then(($a) => {
            const href = $a.attr("href");
            expect(href).to.include(link.domain);
          });
      });
    });
  });

  it("should validate that all footer links have non-empty href attributes", () => {
    cy.get(".footer a").each(($el) => {
      cy.wrap($el).should("have.attr", "href").and("not.be.empty");
    });
  });
});

describe("AirportLabs Home Page - Logo", () => {
  beforeEach(() => {
    airportLabHomePage.visit();
  });

  it("should validate the logo is visible and has valid dimensions", () => {
    airportLabHomePage
      .getLogo()
      .filter(":visible")
      .first()
      .should("be.visible")
      .and(($img) => {
        // Verify CSS Dimensions
        expect($img.width()).to.be.greaterThan(0);
        expect($img.height()).to.be.greaterThan(0);
      });
  });

  it("should validate the logo has a non-empty src attribute", () => {
    airportLabHomePage
      .getLogo()
      .filter(":visible")
      .should("have.attr", "src")
      .and("not.be.empty");
  });
});

describe("AirportLabs Home Page - Product Tabs", () => {
  beforeEach(() => {
    airportLabHomePage.visit();
  });

  it("should validate the default selected product tab", () => {
    airportLabHomePage
      .getProductTabsMenu()
      .find(".w--current")
      .should("contain.text", "All");
  });

  it("should validate product tabs functionality", () => {
    const targetTab = "Command & Control";
    const expectedProduct = "SkyCore AODB";

    airportLabHomePage.getProductTab(targetTab).click();

    // The clicked tab should now have the active class 'w--current'
    airportLabHomePage
      .getProductTab(targetTab)
      .should("have.class", "w--current")
      .and("have.attr", "aria-selected", "true");

    // The active pane should now contain specific products belonging to this category
    airportLabHomePage
      .getActiveTabPane()
      .should("be.visible")
      .within(() => {
        cy.contains(expectedProduct).should("be.visible");
        cy.get(".integration-box").should("have.length.greaterThan", 0);
      });
  });
});
