// Navigation functions moved outside of the event listener to be globally accessible
function navigateToForm() {
  window.location.href = "/form/";  // Correct URL path for the form page
}

function navigateToHome() {
  window.location.href = "/";  // Correct URL path for the home page
}

document.addEventListener('DOMContentLoaded', function() {

  // Only add the event listener if the toggle button exists on the page
  var toggleFiltersButton = document.getElementById('toggleFiltersButton');
  if (toggleFiltersButton) {
    toggleFiltersButton.addEventListener('click', function() {
      var filters = document.getElementById('filters');
      var button = document.getElementById('toggleFiltersButton');

      if (filters.style.display === 'none' || filters.style.display === '') {
        filters.style.display = 'block'; // Show the filters
        button.textContent = 'Hide Filters'; // Change button text
      } else {
        filters.style.display = 'none'; // Hide the filters
        button.textContent = 'Show Advanced Filters'; // Change button text
      }
    });
  }

  // Reset Filters Button Functionality
  var resetFiltersButton = document.getElementById('resetFiltersButton');
  if (resetFiltersButton) {
    document.querySelectorAll('.filter-group select').forEach(function(select) {
      select.addEventListener('change', function() {
        var anySelected = Array.from(document.querySelectorAll('.filter-group select')).some(function(sel) {
          return sel.value !== "Select"; // Assuming "Select" is the default option value
        });
        if (anySelected) {
          resetFiltersButton.style.display = 'inline-block'; // Show the Reset Filters button
        } else {
          resetFiltersButton.style.display = 'none'; // Hide the Reset Filters button
        }
      });
    });

    resetFiltersButton.addEventListener('click', function() {
      document.querySelectorAll('.filter-group select').forEach(function(select) {
        select.value = "Select"; // Reset each select to the default "Select" value
      });
      resetFiltersButton.style.display = 'none'; // Hide the Reset Filters button
    });
  }

});
