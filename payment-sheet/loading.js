function simulateLoading() {
    var loadingSpinner = document.getElementById("loading-spinner");
    var pcon = document.getElementById("p-con");
    // Display the loading spinner
    loadingSpinner.style.display = "block";
    pcon.style.display = "none";

    // Simulate some loading time (you can replace this with actual asynchronous operations)
    setTimeout(function() {
      // Hide the loading spinner after the simulated loading is complete
      loadingSpinner.style.display = "none";
    }, 3000); // Simulating 3 seconds of loading time
  }