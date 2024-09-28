// Navigation functions moved outside of the event listener to be globally accessible
function navigateToForm() {
  window.location.href = "/form/";
}

function navigateToHome() {
  window.location.href = "/";
}

document.addEventListener('DOMContentLoaded', function () {

  // Only add the event listener if the toggle button exists on the page
  var toggleFiltersButton = document.getElementById('toggleFiltersButton');
  if (toggleFiltersButton) {
    toggleFiltersButton.addEventListener('click', function () {
      var filters = document.getElementById('filters');
      var button = document.getElementById('toggleFiltersButton');

      if (filters.style.display === 'none' || filters.style.display === '') {
        filters.style.display = 'block';
        button.textContent = 'Hide Filters';
      } else {
        filters.style.display = 'none';
        button.textContent = 'Show Advanced Filters';
      }
    });
  }

  // Reset Filters Button Functionality
  var resetFiltersButton = document.getElementById('resetFiltersButton');
  if (resetFiltersButton) {
    document.querySelectorAll('.filter-group select').forEach(function (select) {
      select.addEventListener('change', function () {
        var anySelected = Array.from(document.querySelectorAll('.filter-group select')).some(function (sel) {
          return sel.value !== "Select";
        });
        if (anySelected) {
          resetFiltersButton.style.display = 'inline-block';
        } else {
          resetFiltersButton.style.display = 'none';
        }
      });
    });

    resetFiltersButton.addEventListener('click', function () {
      document.querySelectorAll('.filter-group select').forEach(function (select) {
        select.value = "Select";
      });
      resetFiltersButton.style.display = 'none';
    });
  }

});

function toggleFilters() {
  const filtersContainer = document.getElementById("filters");
  filtersContainer.classList.toggle("show");
}

function copyToClipboard() {
  const ruleText = document.getElementById('ruleText').innerText;
  const textarea = document.createElement('textarea');
  textarea.value = ruleText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

}


function filterRules() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const rules = document.querySelectorAll('.rule-item');

  rules.forEach(rule => {
    const title = rule.querySelector('.rule-title').textContent.toLowerCase();
    if (title.includes(filter)) {
      rule.style.display = '';
    } else {
      rule.style.display = 'none';
    }
  });
}

// Function to handle the Delete Modal, dynamically updating the form action with the rule ID
function setupDeleteModal() {
  var deleteModal = document.getElementById('deleteModal');

  $('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ruleId = button.data('rule-id');
    var actionUrl = `/delete-rule/${ruleId}/`;

    var deleteForm = deleteModal.querySelector('#deleteForm');
    deleteForm.setAttribute('action', actionUrl);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setupDeleteModal();
});


