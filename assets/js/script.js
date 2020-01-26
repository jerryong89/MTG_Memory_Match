var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;

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
      matches++;
      console.log(matches)
      if (matches === maxMatches) {
        console.log("you win")
        var h1Element = document.createElement("h1");
        var win = document.createTextNode("Congratulations, You have Won!!!");
        h1Element.appendChild(win)
        var modalDiv = document.createElement("div");
        modalDiv.setAttribute("class", "modal-content");
        modalDiv.appendChild(h1Element);
        var winDiv = document.createElement("div");
        winDiv.setAttribute("class", "modal-overlay")
        winDiv.appendChild(modalDiv)
        var bodyTag = document.querySelector("body")
        bodyTag.appendChild(winDiv)
      }
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
