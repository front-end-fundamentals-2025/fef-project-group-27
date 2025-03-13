document.addEventListener("DOMContentLoaded", () => {
  const totalAmount = localStorage.getItem("totalAmount");
  if (totalAmount) {
      document.getElementById("total-amount").textContent = totalAmount;
  } else {
      document.getElementById("total-amount").textContent = "0.00"; // Fallback if no total amount is found
  }


  // Retrieve the selected sizes from localStorage
  const selectedSizes = JSON.parse(localStorage.getItem("selectedSizes")) || [];
 
  // Display the sizes in the thank you page
  const sizeDisplay = document.querySelector(".confirmation p:nth-child(2)");
  if (selectedSizes.length >= 0) {
      sizeDisplay.textContent = `Product: Straight Denim Jeans size: ${selectedSizes.join(", ")}`;
  } else {
      sizeDisplay.textContent = "Product: Straight Denim Jeans size: ---";
  }


  // Retrieve the email from localStorage
  const customerEmail = localStorage.getItem("customerEmail");
  const emailDisplay = document.querySelector(".email-confirmation p");
  if (customerEmail) {
      emailDisplay.textContent = `An email has been sent to ${customerEmail}`;
  } else {
      emailDisplay.textContent = "An email has been sent to ---";
  }
});

