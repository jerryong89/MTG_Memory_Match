var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;

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
      attempts++;
      displayStats()
      if (matches === maxMatches) {
        var h1Element = document.createElement("h1");
        var win = document.createTextNode("Congratulations, You have Won!!!");
        h1Element.appendChild(win)
        var modalDiv = document.createElement("div");
        modalDiv.setAttribute("class", "modal-content");
        modalDiv.appendChild(h1Element);
        var winDiv = document.createElement("div");
        winDiv.setAttribute("class", "modal-overlay");
        winDiv.appendChild(modalDiv);
        var bodyTag = document.querySelector("body");
        bodyTag.appendChild(winDiv);

        var resetButton = document.createElement("button");
        resetButton.setAttribute("id", "resetId")
        // var containerId = document.getElementById("resetId");
        var playAgain = document.createTextNode("Would You Like to Play Again?");
        resetButton.appendChild(playAgain);
        h1Element.appendChild(resetButton);
        // containerId.addEventListener("click", resetGame);
        // document.getElementById("resetId").addEventListener("click", resetGame);
        resetButton.addEventListener("click", resetGame);

      }
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden"),
          secondCardClicked.classList.remove("hidden"),
          firstCardClicked = !firstCardClicked,
          secondCardClicked = !secondCardClicked,
          attempts++;
        displayStats()
        container.addEventListener("click", handleClick)
      }, 1500);
    }
  }
}
function displayStats() {
  document.getElementById("gamesplayedid").textContent = gamesPlayed;
  document.getElementById("attemptsid").textContent = attempts;
  document.getElementById("accuracyid").textContent = calculateAccuracy(matches, attempts);
}
function calculateAccuracy(matches, attempts) {
  if (!attempts) {
    return "0%";
  }
  return (Math.trunc((matches / attempts) * 100)) + "%";
};

function resetGame() {
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  hideModal();
}
function resetCards() {
  var hiddenCards = document.querySelectorAll(".card-back");
  for (var cardArray = 0; cardArray < hiddenCards.length; cardArray++) {
    hiddenCards[cardArray].classList.remove("hidden")
  }
}
function hideModal() {
  var parent = document.getElementsByTagName("body")[0]
  var child = parent.getElementsByClassName("modal-overlay")[0]
  parent.removeChild(child)
}
