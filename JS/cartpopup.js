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
  productData.size = selectedSize; // Add the selected size to the product data
  cart.push(productData);
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
    itemElement.className = "cart-item ";
    itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" >
            <div class="cart-info " > <p>${item.name}  
            - Size: ${item.size} </p>    


           


            </div>
            <div class="cart-buttons">
            <button class="removefromcart" onclick="removeFromCart(${index})">
            <i class="fa-solid fa-trash"></i></button>
            <span >$${item.price.toFixed(2)}</span>
           
           </div>
           
        `;


    cartItems.appendChild(itemElement);
    total += item.price;
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


