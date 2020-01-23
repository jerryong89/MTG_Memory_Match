var container = document.getElementById("gameCards")
container.addEventListener("click",
  function handleClick(event) {
    if (event.target.className.indexOf("card-back") === -1) {
      return;
    }
    var divElement = event.target;
    divElement.className +="hidden";
    console.log(event)
  }
);
