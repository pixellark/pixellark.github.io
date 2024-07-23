



var reveals = document.querySelectorAll(".swing");

window.addEventListener("scroll", function() {  
  reveal();
});




function reveal() {
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 70;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("show");
    } else {
        //important
   reveals[i].classList.remove("show");
    }
  }
}
