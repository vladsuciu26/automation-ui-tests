import { EmagCartPage } from "../../pages/Emag/EmagCartPage";
import { EmagHomePage } from "../../pages/Emag/EmagHomePage";
import { EmagTvCategoryPage } from "../../pages/Emag/EmagTvCategoryPage";

const emagHomePage = new EmagHomePage();
const emagTvCategoryPage = new EmagTvCategoryPage();
const emagCartPage = new EmagCartPage();

describe("Shopping Tests", () => {
  beforeEach(() => {
    emagHomePage.visitAltexMainPage();
    cy.wait(2000);
    emagHomePage.clickRefuseCookieButton();
    cy.wait(1500);
    emagHomePage.verifyProductTabIsVisible();
    emagHomePage.hoverTvSection();
    cy.scrollTo("top");
    emagHomePage.clickTvCategory();
    cy.wait(2000);
    cy.scrollTo("top");
  });

  it("should add most expensive TV and cheapest accessory of same brand to cart and verify total price and brand", () => {
    const brandName = "Samsung";

    // Add TV (Most Expensive)
    emagTvCategoryPage.clickBrandFilter();
    emagTvCategoryPage.clickBrandOption(brandName);
    emagTvCategoryPage.clickShowResultsButton();
    cy.wait(2000);
    emagTvCategoryPage.categoryTitleDisplayCheck("Televizoare " + brandName);
    emagTvCategoryPage.selectSortOption("Pret descrescator");
    emagTvCategoryPage.clickRatingFilter5Stars();
    cy.lockScrollToTop();
    emagTvCategoryPage.clickAddToCartOnFirstProduct();
    emagTvCategoryPage.clickCloseModalButton();

    // Add Accessory (Cheapest, Same Brand)
    emagTvCategoryPage.clickAccesoriesCategory();
    emagTvCategoryPage.clickBrandFilter();
    emagTvCategoryPage.clickBrandOption(brandName);
    emagTvCategoryPage.clickShowResultsButton();
    cy.wait(2000);
    emagTvCategoryPage.categoryTitleDisplayCheck("Accesorii TV " + brandName);
    emagTvCategoryPage.selectSortOption("Pret crescator");
    emagTvCategoryPage.clickRatingFilter5Stars();
    cy.lockScrollToTop();
    emagTvCategoryPage.clickAddToCartOnFirstProduct();
    emagTvCategoryPage.clickCloseModalButton();

    // Go to cart
    emagTvCategoryPage.clickCartButton();

    // Verify cart contents and total sum
    emagCartPage.elements.getCartItems().should("have.length", 2);
    emagCartPage.verifyBrandInAllItems(brandName);
    emagCartPage.verifyCartTotals();
  });
});
