export class EmagTvCategoryPage {
  elements = {
    getBrandFilterButton: () =>
      cy.get('span[class*="gc-filter-name"]').contains("Brand"),
    getShowResultsButton: () =>
      cy.get('button[class*="gc-modal-footer-show-results"]'),
    getCategoryTitle: () => cy.get('h1[class*="title-phrasing"]'),
    getSortDropdown: () =>
      cy.get('div[class*="sort-control-btn-dropdown"]').find("button").eq(0),
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
    cy.wait(1000);
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
}
