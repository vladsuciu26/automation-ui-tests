import { EmagHomePage } from "../../pages/Emag/EmagHomePage";
import { EmagTvCategoryPage } from "../../pages/Emag/EmagTvCategoryPage";

const emagHomePage = new EmagHomePage();
const emagTvCategoryPage = new EmagTvCategoryPage();

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

  it("should add most expensive TV and cheapest accessory of same brand to cart", () => {
    const brandName = "Samsung";
    emagTvCategoryPage.clickBrandFilter();
    emagTvCategoryPage.clickBrandOption(brandName);
    emagTvCategoryPage.clickShowResultsButton();
    cy.wait(2000);
    emagTvCategoryPage.categoryTitleDisplayCheck("Televizoare " + brandName);
    cy.lockScrollToTop();
    emagTvCategoryPage.selectSortOption("Pret descrescator");
  });
});
