document.addEventListener('DOMContentLoaded', function() {

  // Navigation functions
  function navigateToForm() {
      window.location.href = "/form/";
  }

  function navigateToHome() {
      window.location.href = "/";
  }

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
      resetFiltersButton.addEventListener('click', function() {
          // Reset the form fields and remove query parameters from URL
          document.getElementById('filter-form').reset(); // Reset form fields
          window.location.href = window.location.pathname; // Reload without query params to reset filters
      });
  }
});
