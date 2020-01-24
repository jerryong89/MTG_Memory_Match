var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;

var container = document.getElementById("gameCards");
container.addEventListener("click", handleClick);
function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  var divElement = event.target;
  divElement.className += " hidden";
  if (!firstCardClicked) {
    firstCardClicked = divElement;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    secondCardClicked = divElement;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    container.removeEventListener("click", handleClick);
    if (firstCardClasses === secondCardClasses) {
      container.addEventListener("click", handleClick);
      firstCardClicked = !firstCardClicked;
      secondCardClicked = !secondCardClicked;
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden"),
          secondCardClicked.classList.remove("hidden"),
          firstCardClicked = !firstCardClicked,
          secondCardClicked = !secondCardClicked,
          container.addEventListener("click", handleClick)
      }, 1500);
    }
  }
}
