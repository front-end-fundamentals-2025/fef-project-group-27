const image = document.getElementById("clickableImage");

image.addEventListener("click", function () {
  window.location.href = "productOverview.html";
});

image.addEventListener("mouseover", function () {
  image.src = "IMG/jweans2.avif";
});

image.addEventListener("mouseout", function () {
  image.src = "IMG/jeanss1.avif";
});
