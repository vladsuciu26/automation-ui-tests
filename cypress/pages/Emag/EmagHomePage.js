export class EmagHomePage {
  elements = {
    getRefuseCookieButton: () => cy.contains("button", "Refuză toate"),
    getProductTab: () => cy.get('div[class="navbar-aux-content__departments"]'),
    getTvSection: () => cy.contains("span", "TV, Audio-Video & Foto"),
    getTvCategory: () =>
      cy.get('a[class="megamenu-item"]').contains("Televizoare"),
  };

  visitAltexMainPage() {
    cy.visit("https://www.emag.ro/");
  }

  clickRefuseCookieButton() {
    this.elements.getRefuseCookieButton().click();
  }

  verifyProductTabIsVisible() {
    this.elements
      .getProductTab()
      .should("be.visible")
      .and("contain.text", "Produse");
  }

  hoverTvSection() {
    this.elements.getTvSection().invoke("show").click();
  }

  clickTvCategory() {
    this.elements.getTvCategory().click();
  }
}
