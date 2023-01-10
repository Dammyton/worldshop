describe("cart-page", () => {
  // 1.Increase the quantity of items in the cart
  it("should increase the quantity by 1", () => {
    // Add product to cart from the listing page
    cy.visit("/");
    cy.get("#add-to-cart-btn").click();
    cy.wait(0);

    cy.visit("/cart");

    // Get the initial quantity of the first item in the cart
    cy.get("#cartItem")
      .first()
      .find(".quantity")
      .then((quantity) => {
        const initialQuantity = parseInt(quantity[0].value);

        // Click the "plus" button to increase the quantity
        cy.get(".QuantityBox").first().find('button[name="increment"]').click();

        // Get the updated quantity of the first item in the cart
        cy.get(".QuantityBox")
          .first()
          .find(".quantity")
          .then((updatedQuantity) => {
            const finalQuantity = parseInt(updatedQuantity[0].value);

            // Ensure that the quantity has increased by 1
            expect(finalQuantity).to.equal(initialQuantity + 1);
          });
      });
  });

  // 2.Decrease the quantity of items in the cart
  it("should decrease the quantity by 1", () => {
    // Add product to cart from the listing page
    cy.visit("/");
    cy.get("#add-to-cart-btn").click();
    cy.wait(0);
    cy.get("#add-to-cart-btn").click();
    cy.wait(0);

    cy.visit("/cart");

    // Get the initial quantity of the first item in the cart
    cy.get("#cartItem")
      .first()
      .find(".quantity")
      .then((quantity) => {
        const initialQuantity = parseInt(quantity[0].value);

        // Click the "plus" button to increase the quantity
        cy.get(".QuantityBox").first().find('button[name="decrement"]').click();

        // Get the updated quantity of the first item in the cart
        cy.get(".QuantityBox")
          .first()
          .find(".quantity")
          .then((updatedQuantity) => {
            const finalQuantity = parseInt(updatedQuantity[0].value);

            // Ensure that the quantity has decreased by 1
            expect(finalQuantity).to.equal(initialQuantity - 1);
          });
      });
  });

  // 3. Remove item from cart
  it("should remove item from user cart", () => {
    // Add an item to the cart in local storage
    cy.window().then((win) => {
      win.localStorage.setItem(
        "cartList",
        JSON.stringify([{ id: 1, quantity: 1, relationtoproduct: {} }])
      );
    });
    cy.visit("/cart");

    cy.get("[data-testid='removeItem']").click();

    // Ensure that the cart in local storage is empty
    cy.window().then((win) => {
      const cart = win.localStorage.getItem("cartList");
      expect(cart).to.equal("[]");
    });
  });
});
