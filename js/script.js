
function activestep(step){
      // Get all elements with the class "pbtn"
      var buttons = document.querySelectorAll('.pbtn');

      // Loop through each button
      buttons.forEach(function(button) {
          // Remove the "active" class from each button
          button.classList.remove('active');
      });

      var activebuttons = document.getElementById(step);
      activebuttons.classList.add('active');


      var secs = document.querySelectorAll('.stepcontent');

      // Loop through each button
      secs.forEach(function(sec) {
          // Remove the "active" class from each button
          sec.classList.add('hidden');
      });


      var section = document.getElementById(step+'c');
      section.classList.remove('hidden');

}
