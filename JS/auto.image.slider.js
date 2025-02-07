// Slider 1
var counter1 = 1;
setInterval(function () {
  document.getElementById("radio1-" + counter1).checked = true;
  counter1++;
  if (counter1 > 4) {
    counter1 = 1;
  }
}, 5000);

// Slider 2
var counter2 = 1;
setInterval(function () {
  document.getElementById("radio2-" + counter2).checked = true;
  counter2++;
  if (counter2 > 4) {
    counter2 = 1;
  }
}, 5000);