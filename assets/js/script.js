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
      console.log(attempts);
      // console.log(matches)
      if (matches === maxMatches) {
        console.log("you win")
        // var modalcontainer = document.getElementsByClassName("modal-overlay");
        // modalcontainer.classList.remove("hidden");
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

        var resetbutton = document.createElement("button");
        resetbutton.setAttribute("id", "resetId")
        var containerId = document.getElementById("resetId");
        var playAgain = document.createTextNode("Would You Like to Play Again?");
        resetbutton.appendChild(playAgain);
        h1Element.appendChild(resetbutton);
        containerId.addEventListener("click", resetGame);

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
function displayStats(){
  document.getElementById("gamesplayedid").textContent = gamesPlayed;
  document.getElementById("attemptsid").textContent = attempts;
  document.getElementById("accuracyid").textContent = calculateAccuracy(matches, attempts);
}
function calculateAccuracy(matches, attempts) {
  return(Math.trunc((matches/attempts)*100)) + "%"
};

function resetGame() {
  attempts=0;
  matches=0;
  gamesPlayed++;
  displayStats();
  resetCards();
}

function resetCards() {
  var hiddenCards = document.querySelectorAll(".card-back");
  for (var cardArray = 0; cardArray < hiddenCards.length; cardArray++){
    hiddenCards[cardArray].classList.remove("hidden")
  }
}
