describe("product-listing-page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // 1. Display twenty products by default
  it("successfully displays twenty products by default", () => {
    cy.get("#productCard #card").should("have.length", 20);
  });

  // 2. Add multiple item to cart from the listing page
  it("user adds multiple items to cart", () => {
    cy.get("#add-to-cart-btn").click();
    cy.wait(0);
    cy.get("#cartCounter").should("contain.text", "1");

    cy.get("#add-to-cart-btn").click();
    cy.wait(0);
    cy.get("#cartCounter").should("contain.text", "2");
  });
});
