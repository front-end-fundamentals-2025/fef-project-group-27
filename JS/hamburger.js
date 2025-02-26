document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".dropdown-container").classList.toggle("active");
});

document.querySelectorAll(".button-content").forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (window.innerWidth <= 320 && window.innerWidth > 320 
        || window.innerWidth <= 10000 
        
    ) {
      e.preventDefault();
      this.classList.toggle("active");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  if (
    window.innerWidth > 320 &&
    window.innerWidth >= 1023 
    
  )
    return;
  const dropdownContainer = document.querySelector(".dropdown-container");
  if (
    !e.target.closest(".dropdown-container") &&
    !e.target.closest(".hamburger")
  ) {
    dropdownContainer.classList.remove("active");
  }
});

const productpage = document.getElementById("productpage");
productpage.addEventListener("click", function () {
  window.location.href = "productsPage.html";
});


