document.addEventListener("DOMContentLoaded", () => {
    const totalAmount = localStorage.getItem("totalAmount");
    if (totalAmount) {
      document.getElementById("total-amount").textContent = totalAmount;
    } else {
      document.getElementById("total-amount").textContent = "0.00"; // Fallback if no total amount is found
    }
  });