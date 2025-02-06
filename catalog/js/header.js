
  // JavaScript code to add event listener on scroll
  window.addEventListener("scroll", function () {
    var header = document.querySelector(".headerdes"); // Changed the query selector to use .header1 class
    if (window.scrollY >= 80) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });





  const menuDiv = document.querySelector('.menu');
  const menuSecDiv = document.querySelector('.menusec');


  menuDiv.addEventListener('click', () => {
    menuSecDiv.classList.remove('hiddenf');
    var header = document.querySelector('.headerdes');
    var scrollY = window.scrollY || window.pageYOffset;

    header.style.position = 'absolute';
    header.style.top = scrollY + 'px';
  });


  menuSecDiv.addEventListener('click', () => {
    menuSecDiv.classList.add('hiddenf');
    var header = document.querySelector('.headerdes');
    function applyFixedPosition() {
      header.style.position = 'fixed';
      header.style.top = '0px';
    }
    const delay = 800; //link with menusec transition
    setTimeout(applyFixedPosition, delay);
  });

