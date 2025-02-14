
function activestep(step) {
    // Get all elements with the class "pbtn"
    var buttons = document.querySelectorAll('.pbtn');

    // Loop through each button
    buttons.forEach(function (button) {
        // Remove the "active" class from each button
        button.classList.remove('active');
    });

    var activebuttons = document.getElementById(step);
    activebuttons.classList.add('active');


    var secs = document.querySelectorAll('.stepcontent');

    // Loop through each button
    secs.forEach(function (sec) {
        // Remove the "active" class from each button
        sec.classList.add('hidden');
    });


    var section = document.getElementById(step + 'c');
    section.classList.remove('hidden');

}






function openDialer() {

    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = 'tel:+94789797988';

    } else {
        window.open('https://wa.me/+94789797988', '_blank');
    }
}








if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    console.log("Mobile version");

    let cursurh = document.querySelectorAll(".cursor");

    cursurh.forEach(c => {
        c.classList.add("hidden");
    });

    var contact = document.getElementById("contactbtnn");
    contact.querySelector("i").remove(); // Remove existing icon if present
    contact.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-phone"></i>`);


    let elements2 = document.querySelectorAll(".service, .service3, .ser2, .contact-btn, footer, .headerdes");
    elements2.forEach(element => {
        element.style.justifyContent = "center";
    });

    let timeout;
    window.onload = function () {
        let hero = document.querySelector(".hero");
        let elements2 = document.querySelectorAll(".service, .service3, .ser2, .contact-btn, footer, .headerdes");
        let body = document.querySelector("body");

        hero.style.height = "100vh";

        let timeoutbody = setTimeout(function () {
            // Remove the 'hidden' class after 400ms
            body.classList.remove("hidden");
        }, 400);


        // Delay changing the height after 1.5s
        timeout = setTimeout(function () {
            hero.style.height = "40vh";
            hero.style.transition = ("height 0.5s");
            elements2.forEach(element => {
                element.classList.remove("hidden");
                element.classList.add("visible"); // Add the visible class for transition
            });


            let timeout2;

            timeout2 = setTimeout(function () {
                elements2.forEach(element => {
                    // element.classList.add("opacity-01");
                    element.style.transition = ("opacity 0.2s");
                    element.style.opacity = ("1");
                });
            }, 500);



        }, 1000);
    };

} else {
    console.log("Desktop version");


    let timeout;
    window.onload = function () {
        let hero = document.querySelector(".hero");
        let elements2 = document.querySelectorAll(".service, .service3, .ser2, .contact-btn, footer, .headerdes");
        let body = document.querySelector("body");


        let timeoutbody = setTimeout(function () {
            // Remove the 'hidden' class after 400ms
            body.classList.remove("hidden");
        }, 400);


        // Delay changing the height after 1.5s
        timeout = setTimeout(function () {
            hero.style.height = "60vh";
            hero.style.transition = ("height 0.5s");
            elements2.forEach(element => {
                element.classList.remove("hidden");
                element.classList.add("visible"); // Add the visible class for transition
            });


            let timeout2;

            timeout2 = setTimeout(function () {
                elements2.forEach(element => {
                    // element.classList.add("opacity-01");
                    element.style.transition = ("opacity 0.2s");
                    element.style.opacity = ("1");
                });
            }, 500);



        }, 1000);
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.style.position = "fixed";
    fullscreenDiv.style.top = 0;
    fullscreenDiv.style.left = 0;
    fullscreenDiv.style.width = "100vw";
    fullscreenDiv.style.height = "100vh";
    fullscreenDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    fullscreenDiv.style.display = "none";
    fullscreenDiv.style.justifyContent = "center";
    fullscreenDiv.style.alignItems = "center";
    fullscreenDiv.style.zIndex = "4000";
    fullscreenDiv.style.opacity = "0";  // Start hidden with opacity 0
    fullscreenDiv.style.transition = "opacity 0.5s ease";

    const fullImage = document.createElement("img");
    fullImage.style.maxWidth = "100%";
    fullImage.style.maxHeight = "100%";
    fullImage.style.objectFit = "contain";
    fullImage.style.borderRadius = "12px";
    fullscreenDiv.appendChild(fullImage);

    document.body.appendChild(fullscreenDiv);

    document.querySelectorAll(".pos-image, .erp-image").forEach(img => {
        img.style.cursor = "pointer";
        img.style.zIndex = "1000";

        img.addEventListener('mouseenter', function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "0.5s";
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = "scale(1)";
        });

        img.addEventListener("click", function () {
            fullImage.src = this.src;
            fullscreenDiv.style.display = "flex";
            setTimeout(() => {
                fullscreenDiv.style.opacity = "1";
            }, 10);
        });
    });

    fullscreenDiv.addEventListener("click", function () {
        fullscreenDiv.style.opacity = "0";
        setTimeout(() => {
            fullscreenDiv.style.display = "none";
        }, 500);
        
        // Reset the cursor animation on exit from fullscreen
        mousecircle(true);
    });
});

function mousecircle(reset = false) {
    const cursor = document.querySelector('.cursor');

    if (reset) {
        // Allow the cursor to reset to normal behavior after closing the full-screen mode
        cursor.style.transition = "transform 0.2s ease-out";  // Optional smooth transition for reset
    }

    document.addEventListener('mousemove', (e) => {
        const cursorSize = cursor.offsetWidth / 2;
        cursor.style.transform = `translate(${e.clientX - cursorSize}px, ${e.clientY - cursorSize}px)`;
    });
}
mousecircle();
