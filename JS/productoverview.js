const smallImages = document.querySelectorAll(".small-image");
const mainImage = document.getElementById("main-image");

smallImages.forEach((image) => {
  image.addEventListener("mouseover", () => {
    mainImage.src = image.src; // Update the main image source
  });
});

