
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const checkoutForm = document.getElementById("checkout-form");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const deliveryFee = 5; // Delivery fee is $5


  // Function to calculate the total amount
  const calculateTotalAmount = () => {
      let total = 0;
      cart.forEach(item => {
          total += item.price * item.quantity;
      });
      return (total + deliveryFee).toFixed(2); // Include delivery fee
  };


  // Function to update the cart in localStorage and refresh the display
  const updateCart = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems(); // Re-render the cart items
  };


  // Function to check if the new size or quantity exceeds the limit
  const checkLimit = (item, newSize, newQuantity) => {
      const totalItemsWithNewSize = cart.reduce((total, cartItem) => {
          if (cartItem.name === item.name && cartItem.size === newSize) {
              return total + cartItem.quantity;
          }
          return total;
      }, 0);


      // Only trigger an alert if the total quantity for the new size exceeds 4
      if (totalItemsWithNewSize + newQuantity > 4) {
          alert("You cannot add more than 4 items of the same size.");
          return false; // Stop the change
      }
      return true;
  };


  // Function to render cart items
  const renderCartItems = () => {
      cartItemsContainer.innerHTML = ""; // Clear the container


      if (cart.length === 0) {
          cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
          return;
      }


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
      });


      // Display total amount with delivery fee
      const totalAmount = calculateTotalAmount();
      const totalElement = document.createElement("div");
      totalElement.className = "total-amount";
      totalElement.innerHTML = `
          <hr />
          <section id="about-purchase" class="about-purchase">
              <form>
                  <div class="form-group" style="padding-top  : 15px;">
                      <label>Discount Code?<i class="fa-solid fa-caret-down" style="padding-left: 5px;"></i></label>
                  </div>
              </form>
              <hr>
              <form>
                  <div class="form-group" style="padding-top  : 15px;">
                      <label>Gift Card?<i class="fa-solid fa-caret-down" style="padding-left: 5px;"></i></label>
                  </div>
              </form>
              <hr>
              <form>
                  <div class="form-group">
                      <label class="delivery-fee">
                          <span>Delivery Fee</span>
                          <span style="font-weight:bold" >$${deliveryFee.toFixed(2)}</span>
                      </label>
                  </div>
              </form>
              <hr>
              <div class="form-group">
                  <label class="delivery-fee">
                      <span>Total Amount To Pay</span>
                      <span style="font-weight:bold" >$${totalAmount}</span>
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


              // Check if the new size already has 4 items
              const totalItemsWithNewSize = cart.reduce((total, cartItem) => {
                  if (cartItem.name === item.name && cartItem.size === newSize) {
                      return total + cartItem.quantity;
                  }
                  return total;
              }, 0);


              // Only trigger an alert if the total quantity for the new size exceeds 4
              if (totalItemsWithNewSize + item.quantity > 4) {
                  alert("You cannot add more than 4 items of the same size.");
                  e.target.value = item.size; // Revert the selection
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


              // Only trigger an alert if the total quantity for the size exceeds 4
              if (totalItemsWithSameSize - item.quantity + newQuantity > 4) {
                  alert("You cannot add more than 4 items of the same size.");
                  e.target.value = item.quantity; // Revert the selection
                  return;
              }


              cart[index].quantity = newQuantity; // Update the quantity in the cart
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


  // Handle form submission
  checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the default form submission


      // Validate all required fields
      const firstName = document.getElementById("first-name").value.trim();
      const lastName = document.getElementById("last-name").value.trim();
      const streetAddress = document.getElementById("street-address").value.trim();
      const postalCode = document.getElementById("postal-code").value.trim();
      const city = document.getElementById("city").value.trim();
      const email = document.getElementById("email").value.trim();
      const phoneNumber = document.getElementById("phone-number").value.trim();


      if (!firstName || !lastName || !streetAddress || !postalCode || !city || !email || !phoneNumber) {
          alert("Please fill out all required fields.");
          return;
      }


      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          alert("Please enter a valid email address.");
          return;
      }


      // Validate phone number format (example: 10 digits)
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
          alert("Please enter a valid 10-digit phone number.");
          return;
      }


      // Store the total amount in localStorage
      const totalAmount = calculateTotalAmount();
      localStorage.setItem("totalAmount", totalAmount);


      // Redirect to the thank you page
      window.location.href = "thankyou.html";
  });
});

