export class EmagTvCategoryPage {
  elements = {
    getBrandFilterButton: () =>
      cy.get('span[class*="gc-filter-name"]').contains("Brand"),
    getShowResultsButton: () =>
      cy.get('button[class*="gc-modal-footer-show-results"]'),
    getCategoryTitle: () => cy.get('h1[class*="title-phrasing"]'),
    getSortDropdown: () =>
      cy.get('div[class*="sort-control-btn-dropdown"]').find("button").eq(0),
    getRatingFilter5Stars: () => cy.get('a[data-option-id="5-5"]'),
    getFirstCard: () =>
      cy.get("#card_grid").find('div[class*="card-item"]').eq(0),
    getCloseModalButton: () => cy.get('button[aria-label="Inchide"]'),
    getAccesoriesCategory: () => cy.contains("a", "Accesorii TV"),
    getCartButton: () => cy.get('a[id="my_cart"]'),
  };

  clickBrandFilter() {
    this.elements
      .getBrandFilterButton()
      .scrollIntoView()
      .click({ force: true }); // force is acceptable here
    cy.wait(500);
  }

  clickBrandOption(brandName) {
    cy.get('div[class="modal-content"]')
      .should("be.visible")
      .within(() => {
        cy.contains("button", brandName)
          .scrollIntoView()
          .should("be.visible")
          .click();
      });
    cy.wait(1500);
  }

  clickShowResultsButton() {
    this.elements.getShowResultsButton().click();
  }

  categoryTitleDisplayCheck(expectedTitle) {
    this.elements.getCategoryTitle().should("contain.text", expectedTitle);
  }

  selectSortOption(optionText) {
    this.elements.getSortDropdown().click({ force: true });
    cy.get("a").contains(optionText).should("be.visible").click();
    cy.wait(2000);
  }

  clickRatingFilter5Stars() {
    this.elements.getRatingFilter5Stars().scrollIntoView().click();
    cy.wait(2000);
  }

  clickAddToCartOnFirstProduct() {
    this.elements
      .getFirstCard()
      .find('button[class*="yeahIWantThisProduct"]')
      .scrollIntoView()
      .click();
    cy.wait(2000);
  }

  clickAccesoriesCategory() {
    this.elements.getAccesoriesCategory().scrollIntoView().click();
    cy.wait(3500);
  }

  clickCloseModalButton() {
    this.elements.getCloseModalButton().click();
    cy.wait(1000);
  }

  clickCartButton() {
    this.elements.getCartButton().click();
    cy.wait(2200);
  }
}
