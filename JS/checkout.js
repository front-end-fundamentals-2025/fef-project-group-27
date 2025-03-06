document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalAmount = 0;
  const deliveryFee = 5; // Delivery fee is $5

  if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
  }

  // Function to update the cart in localStorage and refresh the display
  const updateCart = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated")); // Trigger cart update event
      renderCartItems(); // Re-render the cart items
  };

  // Function to render cart items
  const renderCartItems = () => {
      cartItemsContainer.innerHTML = ""; // Clear the container
      totalAmount = 0; // Reset total amount

      cart.forEach((item, index) => {
          const itemElement = document.createElement("div");
          itemElement.className = "image-content";
          itemElement.innerHTML = `
              <div class="image-content-details">
                  <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;" />
                  <div class="content-details">
                      <p>${item.name}</p>
                      <div class="detail-options">
                          <select class="size-select" data-index="${index}">
                              <option value="S" ${item.size === "S" ? "selected" : ""}>S</option>
                              <option value="M" ${item.size === "M" ? "selected" : ""}>M</option>
                              <option value="L" ${item.size === "L" ? "selected" : ""}>L</option>
                              <option value="XL" ${item.size === "XL" ? "selected" : ""}>XL</option>
                          </select>
                          <select class="quantity-select" data-index="${index}">
                              <option value="1" ${item.quantity === 1 ? "selected" : ""}>1</option>
                              <option value="2" ${item.quantity === 2 ? "selected" : ""}>2</option>
                              <option value="3" ${item.quantity === 3 ? "selected" : ""}>3</option>
                              <option value="4" ${item.quantity === 4 ? "selected" : ""}>4</option>
                          </select>
                      </div>
                  </div>
              </div>
              <div class="price">
                  <i class="fa-solid fa-trash-can remove-item" data-index="${index}"></i>
                  $${(item.price * item.quantity).toFixed(2)}
              </div>
          `;
          cartItemsContainer.appendChild(itemElement);
          totalAmount += item.price * item.quantity;
      });

      // Display total amount with delivery fee
      const totalElement = document.createElement("div");
      totalElement.className = "total-amount";
      totalElement.innerHTML = `
          <hr />
          <section id="about-purchase">
              <form>
                  <div class="form-group">
                      <label>Discount Code?<i class="fa-solid fa-caret-down" style="padding-left: 5px;"></i></label>
                  </div>
              </form>
              <hr>
              <form>
                  <div class="form-group">
                      <label>Gift Card?<i class="fa-solid fa-caret-down" style="padding-left: 5px;"></i></label>
                  </div>
              </form>
              <hr>
              <form>
                  <div class="form-group">
                      <label class="delivery-fee">
                          <span>Delivery Fee</span>
                          <span>$${deliveryFee.toFixed(2)}</span>
                      </label>
                  </div>
              </form>
              <hr>
              <div class="form-group">
                  <label class="delivery-fee">
                      <span>Total Amount To Pay</span>
                      <span>$${(totalAmount + deliveryFee).toFixed(2)}</span>
                  </label>
              </div>
              <hr>
          </section>
      `;
      cartItemsContainer.appendChild(totalElement);

      // Add event listeners for size and quantity changes
      document.querySelectorAll(".size-select").forEach((select) => {
          select.addEventListener("change", (e) => {
              const index = e.target.getAttribute("data-index");
              const newSize = e.target.value;
              const item = cart[index];

              // Check if the new size already has 4 items in the cart
              const totalItemsWithNewSize = cart.reduce((total, cartItem) => {
                  if (cartItem.name === item.name && cartItem.size === newSize) {
                      return total + cartItem.quantity;
                  }
                  return total;
              }, 0);

              if (totalItemsWithNewSize + item.quantity > 4) {
                  alert("You cannot add more than 4 items of the same size.");
                  e.target.value = item.size; // Reset the select to the original size
                  return;
              }

              // Check if an item with the same name and new size already exists
              const existingItemIndex = cart.findIndex(
                  (cartItem, i) =>
                      i !== index && // Ensure we're not comparing the item to itself
                      cartItem.name === item.name &&
                      cartItem.size === newSize
              );

              if (existingItemIndex !== -1) {
                  // If an item with the same name and size exists, merge the quantities
                  cart[existingItemIndex].quantity += item.quantity;
                  cart.splice(index, 1); // Remove the original item
              } else {
                  // Otherwise, just update the size of the item
                  item.size = newSize;
              }

              updateCart();
          });
      });

      document.querySelectorAll(".quantity-select").forEach((select) => {
          select.addEventListener("change", (e) => {
              const index = e.target.getAttribute("data-index");
              const newQuantity = parseInt(e.target.value);
              const item = cart[index];

              // Check if the new quantity exceeds the limit for the item's size
              const totalItemsWithSameSize = cart.reduce((total, cartItem) => {
                  if (cartItem.name === item.name && cartItem.size === item.size) {
                      return total + cartItem.quantity;
                  }
                  return total;
              }, 0);

              if (totalItemsWithSameSize - item.quantity + newQuantity > 4) {
                  alert("You cannot add more than 4 items of the same size.");
                  e.target.value = item.quantity; // Reset the select to the original quantity
                  return;
              }

              cart[index].quantity = newQuantity;
              updateCart();
          });
      });

      // Add event listeners for trashcan (remove item)
      document.querySelectorAll(".remove-item").forEach((icon) => {
          icon.addEventListener("click", (e) => {
              const index = e.target.getAttribute("data-index");
              cart.splice(index, 1);
              updateCart();
          });
      });
  };

  // Initial render
  renderCartItems();

  // Listen for cart updates (e.g., from the cart popup)
  window.addEventListener("cartUpdated", () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.length = 0; // Clear the current cart
      cart.push(...updatedCart); // Update with the latest cart data
      renderCartItems(); // Re-render the cart items
  });
});