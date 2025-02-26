const smallImages = document.querySelectorAll(".small-image");
const mainImage = document.getElementById("main-image");

smallImages.forEach((image) => {
  image.addEventListener("mouseover", () => {
    mainImage.src = image.src; // Update the main image source
  });
});

function toggleSizePopup() {
  const sizePopup = document.getElementById("sizePopup");
  if (sizePopup.style.display === "block") {
    sizePopup.style.display = "none";
  } else {
    sizePopup.style.display = "block";
    updateSizePopup();
  }
 }
 