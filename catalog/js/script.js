
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

    var contact = document.getElementById("contactbtn");
    contact.innerHTML = `Call Us <i class="fa-solid fa-phone">
        </i>`;

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
    // Create the full-screen image element dynamically
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
    fullscreenDiv.style.transition = "opacity 0.5s ease"; // Smooth transition for opacity

    // Create the image element inside the full-screen div
    const fullImage = document.createElement("img");
    fullImage.style.maxWidth = "100%";  // Ensure it scales responsively
    fullImage.style.maxHeight = "100%"; // Ensure it scales responsively
    fullImage.style.objectFit = "contain"; // Maintain aspect ratio and fit within the viewport
    fullImage.style.borderRadius = "12px";
    fullscreenDiv.appendChild(fullImage);

    // Append the full-screen div to the body
    document.body.appendChild(fullscreenDiv);

    // Add click event listeners to all images
    document.querySelectorAll("img").forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
            fullImage.src = this.src; // Set the source of the full-screen image
            fullscreenDiv.style.display = "flex"; // Show the full-screen view
            setTimeout(() => {
                fullscreenDiv.style.opacity = "1"; // Fade in after the display is set
            }, 10);
        });
    });

    // Close the full-screen view with smooth fade-out
    fullscreenDiv.addEventListener("click", function () {
        fullscreenDiv.style.opacity = "0"; // Fade out
        setTimeout(() => {
            fullscreenDiv.style.display = "none"; // Hide the element after the fade-out
        }, 500); // Matches the fade-out duration
    });
});
