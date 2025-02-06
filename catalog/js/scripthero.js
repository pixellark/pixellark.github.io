    // Function to handle the slider transition
    function handleSliderTransition() {
        var sliders = document.querySelectorAll('.slider');
        var activeSlider = document.querySelector('.slider.active');
  
        // Find the index of the current active slider
        var activeIndex = Array.from(sliders).indexOf(activeSlider);
  
        // Remove active class from the current slider
        activeSlider.classList.remove('active');
  
        // Calculate the next index in a loop
        var nextIndex = (activeIndex + 1) % sliders.length;
  
        // Add active class to the next slider
        sliders[nextIndex].classList.add('active');
      }
  
      // Start the loop every 2 seconds (2000 milliseconds)
      setInterval(handleSliderTransition, 7000);
