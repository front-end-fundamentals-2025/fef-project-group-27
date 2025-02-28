// general.js

// Toggle Size Popup
function toggleSizePopup() {
  const sizePopup = document.getElementById("sizePopup");
  const modalOverlay = document.getElementById("modalOverlay");

  if (sizePopup.style.display === "block") {
    sizePopup.style.display = "none";
    modalOverlay.style.display = "none"; // Hide overlay
  } else {
    sizePopup.style.display = "block";
    modalOverlay.style.display = "block"; // Show overlay
  }
}

// Toggle Quantity Popup in Cart
function toggleQuantityPopupInCart(index) {
  const quantityPopup = document.getElementById(`quantityPopupInCart${index}`);
  const modalOverlay = document.getElementById("modalOverlay");

  if (quantityPopup.style.display === "block") {
    quantityPopup.style.display = "none";
    modalOverlay.style.display = "none"; // Hide overlay
  } else {
    quantityPopup.style.display = "block";
    modalOverlay.style.display = "block"; // Show overlay
  }
}

// Toggle Size Popup in Cart
function toggleSizePopupInCart(index) {
  const sizePopup = document.getElementById(`sizePopupInCart${index}`);
  const modalOverlay = document.getElementById("modalOverlay");

  if (sizePopup.style.display === "block") {
    sizePopup.style.display = "none";
    modalOverlay.style.display = "none"; // Hide overlay
  } else {
    sizePopup.style.display = "block";
    modalOverlay.style.display = "block"; // Show overlay
  }
}

// Close Popups When Clicking Outside
document.getElementById("modalOverlay").addEventListener("click", () => {
  // Close all popups
  const sizePopup = document.getElementById("sizePopup");
  const quantityPopups = document.querySelectorAll(".quantity-popup-in-cart");
  const sizePopupsInCart = document.querySelectorAll(".size-popup-in-cart");

  if (sizePopup.style.display === "block") {
    sizePopup.style.display = "none";
  }

  quantityPopups.forEach((popup) => {
    if (popup.style.display === "block") {
      popup.style.display = "none";
    }
  });

  sizePopupsInCart.forEach((popup) => {
    if (popup.style.display === "block") {
      popup.style.display = "none";
    }
  });

  // Hide the overlay
  document.getElementById("modalOverlay").style.display = "none";
});

// Prevent Clicks Inside Popups from Closing Them
document.querySelectorAll(".size-popup, .size-popup-in-cart, .quantity-popup-in-cart").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent clicks inside the popup from closing it
  });
});