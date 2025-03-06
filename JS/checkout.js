document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = 0;
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "image-content";
      itemElement.innerHTML = `
        <div class="image-content-details">
          <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;" />
          <div class="content-details">
            <p>${item.name}</p>
            <p>Size: ${item.size}</p>
            <div class="detail-options">
              <span>Quantity: ${item.quantity}</span>
            </div>
          </div>
        </div>
        <div class="price">
          <i class="fa-solid fa-trash-can"></i>
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
      totalAmount += item.price * item.quantity;
    });
  
    // Display total amount
    const totalElement = document.createElement("div");
    totalElement.className = "total-amount";
    totalElement.innerHTML = `
      <hr />
      <div class="form-group">
        <label class="delivery-fee">
          <span>Total Amount To Pay</span>
          <span>$${totalAmount.toFixed(2)}</span>
        </label>
      </div>
    `;
    cartItemsContainer.appendChild(totalElement);
  });