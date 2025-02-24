document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".dropdown-container").classList.toggle("active");
});

document.querySelectorAll(".button-content").forEach(function (button) {
  button.addEventListener("click", function (e) {
    if (window.innerWidth <= 320) {
      e.preventDefault();
      this.classList.toggle("active");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  if (window.innerWidth > 320) return;
  const dropdownContainer = document.querySelector(".dropdown-container");
  if (
    !e.target.closest(".dropdown-container") &&
    !e.target.closest(".hamburger")
  ) {
    dropdownContainer.classList.remove("active");
  }
});


// Handle clicks on "Show all clothes" and "Jeans" links
document.querySelectorAll('.button-dropdown-title a, .button-dropdown-content-list li').forEach(item => {
    item.addEventListener('click', function (e) {
      if (window.innerWidth <= 320) {
        e.preventDefault();
  
        // Get the parent dropdown content
        const dropdownContent = this.closest('.button-dropdown-content');
  
        // Hide the current dropdown content
        dropdownContent.style.left = '-100%';
  
        // Show the secondary popup
        const secondaryPopup = dropdownContent.querySelector('.secondary-popup');
        secondaryPopup.classList.add('active');
  
       
      }
    });
  });
  
  // Handle back button clicks
  document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
  
      // Hide the secondary popup
      const secondaryPopup = this.closest('.secondary-popup');
      secondaryPopup.classList.remove('active');
  
      // Show the previous dropdown content
      const dropdownContent = secondaryPopup.closest('.button-dropdown-content');
      dropdownContent.style.left = '0';
    });
  });