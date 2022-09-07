const pointBoxes = document.querySelectorAll(".btnRating");
const btnSubmit = document.querySelector(".btnSubmit");
const selectedText = document.querySelector(".feedback_text");
const containerPoint = document.querySelector(".rating");
const containerThank = document.querySelector(".feedback");

let selectedRating = 0;

pointBoxes.forEach((box) => {
  box.addEventListener("click", function () {
    for (let i = 0; i <= 4; i++) {
      if (pointBoxes[i].classList.contains("selected")) {
        pointBoxes[i].classList.remove("selected");
      }
    }
    box.classList.add("selected");
    for (let i = 0; i <= 4; i++) {
      if (pointBoxes[i].classList.contains("selected")) {
        selectedPoint = i + 1;
      }
    }
  });
});

btnSubmit.addEventListener("click", function () {
  for (let i = 0; i <= 4; i++) {
    if (pointBoxes[i].classList.contains("selected")) {
      containerPoint.classList.add("hidden");
      containerThank.classList.remove("hidden");
      selectedText.innerHTML = `You selected ${selectedPoint} out of 5`;
      setTimeout(function () {
        window.location.reload(1);
      }, 7000);
    }
  }
});
