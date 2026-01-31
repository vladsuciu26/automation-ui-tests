export class EmagCartPage {
  elements = {
    getCartItems: () => cy.get(".cart-widget"),
    getProductTitle: () => cy.get(".line-item-title.main-product-title"),
    getProductPrice: () => cy.get(".product-new-price"),
    getCartTotal: () => cy.get('[data-test="summaryTotal"]'),
  };

  // Removes dots (thousands), replaces comma with dot (decimal), removes text.
  _parsePrice(text) {
    const cleanText = text
      .replace(/\./g, "") // Remove thousand separators
      .replace(",", ".") // Replace decimal separator
      .replace(/[^0-9.]/g, ""); // Remove non-numeric chars
    return parseFloat(cleanText);
  }

  verifyBrandInAllItems(brandName) {
    this.elements.getCartItems().each(($item) => {
      cy.wrap($item)
        .find(".line-item-title")
        .should("contain.text", brandName.toUpperCase());
    });
  }

  verifyCartTotals() {
    let calculatedSum = 0;

    // Iterate through items to sum their prices
    this.elements
      .getCartItems()
      .each(($item) => {
        cy.wrap($item)
          .find(".product-new-price")
          .invoke("text")
          .then((text) => {
            const price = this._parsePrice(text);
            calculatedSum += price;
          });
      })
      .then(() => {
        // Get the displayed total
        this.elements
          .getCartTotal()
          .invoke("text")
          .then((totalText) => {
            const displayedTotal = this._parsePrice(totalText);

            // Compare calculated sum with displayed total
            expect(displayedTotal).to.be.closeTo(calculatedSum, 0.01);
          });
      });
  }
}
