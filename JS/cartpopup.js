let selectedSize = null;

function toggleSizePopup() {
  const sizePopup = document.getElementById("sizePopup");
  if (sizePopup.style.display === "block") {
    sizePopup.style.display = "none";
  } else {
    sizePopup.style.display = "block";
  }
}

function selectSize(size) {
  selectedSize = size; // Store the selected size
  const sizePickButton = document.querySelector(".size-pick > span");
  sizePickButton.textContent = `Size: ${size}`; // Update the button text
  toggleSizePopup(); // Close the size popup
}

function toggleSizePopupInCart(index) {
  const sizePopup = document.getElementById(`sizePopupInCart${index}`);
  if (sizePopup.style.display === "block") {
    sizePopup.style.display = "none";
  } else {
    sizePopup.style.display = "block";
  }
}

function selectSizeInCart(size, index) {
  cart[index].size = size; // Update the size in the cart
  saveCartToLocalStorage();
  updateCartPopup();
  toggleSizePopupInCart(index); // Close the size popup
}

// quantity

function toggleQuantityPopupInCart(index) {
  const quantityPopup = document.getElementById(`quantityPopupInCart${index}`);
  if (quantityPopup.style.display === "block") {
    quantityPopup.style.display = "none";
  } else {
    quantityPopup.style.display = "block";
  }
}

function selectQuantityInCart(quantity, index) {
  cart[index].quantity = quantity; // Update the quantity in the cart
  saveCartToLocalStorage();
  updateCartPopup();
  toggleQuantityPopupInCart(index); // Close the quantity popup
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
  const cartPopup = document.getElementById("cartPopup");
  if (cartPopup.style.display === "block") {
    cartPopup.style.display = "none";
  } else {
    cartPopup.style.display = "block";
    updateCartPopup();
  }
}
function addToCart(product) {
  if (!selectedSize) {
    alert("Please select a size before adding to cart.");
    return;
  }

  const productData = JSON.parse(product.getAttribute("data-product"));
  productData.size = selectedSize; // Add the selected size

  // Check if the item with the same size already exists in the cart
  const existingItemIndex = cart.findIndex(
    (item) => item.name === productData.name && item.size === productData.size
  );

  if (existingItemIndex !== -1) {
    // If the item exists, update the quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // If the item does not exist, add it to the cart
    productData.quantity = 1; // Initialize quantity to 1
    cart.push(productData);
  }

  saveCartToLocalStorage();
  updateCartCount();
  updateCartPopup();
  animateCartIcon();

  // Reset the size selection
  selectedSize = null;
  const sizePickButton = document.querySelector(".size-pick > span");
  sizePickButton.textContent = "Choose size"; // Reset the button text
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cart.length;
}

function animateCartIcon() {
  const cartIcon = document.querySelector(".button-cart-icon");
  cartIcon.classList.add("bounce");
  setTimeout(() => {
    cartIcon.classList.remove("bounce");
  }, 500);
}
function updateCartPopup() {
  const cartItems = document.querySelector(".cart-items");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <p>${item.name}</p>
        <div class="cart-details">
        <section class="size-pick-popup-incart"> 
          <button type="button" class="size" onclick="toggleSizePopupInCart(${index})">
            ${
              item.size
            }<i class="fa-solid fa-caret-down" style="padding-left:5px;"></i>
          </button>
          <div class="size-popup-in-cart" id="sizePopupInCart${index}">
            <button onclick="selectSizeInCart('S', ${index})">Small</button>
            <hr class="size-divider" />
            <button onclick="selectSizeInCart('M', ${index})">Medium</button>
            <hr class="size-divider" />
            <button onclick="selectSizeInCart('L', ${index})">Large</button>
            <hr class="size-divider" />
            <button onclick="selectSizeInCart('XL', ${index})">X-Large</button>
          </div>
          </section>
<section class="quantity-pick-popup-in-cart" > 
<button type="button" class="quantity" onclick="toggleQuantityPopupInCart(${index})">
        ${
          item.quantity
        }<i class="fa-solid fa-caret-down" style="padding-left:5px;"></i>
      </button>
      <div class="quantity-popup-in-cart" id="quantityPopupInCart${index}">
        <button onclick="selectQuantityInCart(1, ${index})">1</button>
        <hr class="quantity-divider" />
        <button onclick="selectQuantityInCart(2, ${index})">2</button>
        <hr class="quantity-divider" />
        <button onclick="selectQuantityInCart(3, ${index})">3</button>
        <hr class="quantity-divider" />
        <button onclick="selectQuantityInCart(4, ${index})">4</button>
      </div>
      </section>
    </div>
  </div>
  <div class="cart-buttons">
    <button class="removefromcart" onclick="removeFromCart(${index})">
      <i class="fa-solid fa-trash"></i>
    </button>
    <span>$${(item.price * item.quantity).toFixed(2)}</span>
  </div>
    `;
    cartItems.appendChild(itemElement);
    total += item.price * item.quantity; // Update total based on quantity
  });

  const cartTotal = document.createElement("div");
  cartTotal.id = "cartTotal";
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartItems.appendChild(cartTotal);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage();
  updateCartCount();
  updateCartPopup();
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateCartPopup();
});
