// AVATAR UPLOAD PREVIEW
document
  .getElementById("avatarUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("avatarPreview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// CHECKBOX COLOR
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".form-check-input");

  function updateLabelColor(checkbox) {
    const formCheck = checkbox.closest(".form-check");

    if (!formCheck) {
      console.log("Form-check not found for checkbox:", checkbox);
      return;
    }

    const label = formCheck.querySelector(".form-check-label");

    if (label) {
      if (checkbox.checked) {
        label.classList.remove("unchecked");
        console.log("Checked - Color applied:", label.style.color);
      } else {
        label.classList.add("unchecked");
        console.log("Unchecked - Color applied:", label.style.color);
      }
    } else {
      console.log("Label not found for checkbox:", checkbox);
    }
  }

  checkboxes.forEach(function (checkbox) {
    updateLabelColor(checkbox);
  });

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      console.log("Checkbox state changed:", checkbox.checked);
      updateLabelColor(this);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const genderCheckboxes = document.querySelectorAll(
    ".genders .form-check-input"
  );

  function updateLabelColor(checkbox) {
    const formCheck = checkbox.closest(".form-check");
    if (!formCheck) return;

    const label = formCheck.querySelector(".form-check-label");
    label.classList.toggle("unchecked", !checkbox.checked);
  }

  genderCheckboxes.forEach((checkbox, index) => {
    if (index === 0) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    updateLabelColor(checkbox);
  });

  genderCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        genderCheckboxes.forEach((cb) => {
          if (cb !== this) cb.checked = false;
          updateLabelColor(cb);
        });
      }
      updateLabelColor(this);
    });
  });
});

// LOCATION
document.addEventListener("DOMContentLoaded", function () {
  const streetLocation = document.getElementById("streetLocation");
  const streetSuggestions = document.getElementById("streetSuggestions");
  const streetDropdownArrow = document.getElementById("streetDropdownArrow");
  const arrowIcon = streetDropdownArrow.querySelector("i");

  const cityLocation = document.getElementById("cityLocation");
  const stateLocation = document.getElementById("stateLocation");
  const zipLocation = document.getElementById("zipLocation");

  const streetData = [
    { name: "Main St", city: "New York", state: "NY", zip: "10001" },
    { name: "Elm St", city: "Los Angeles", state: "CA", zip: "90001" },
    { name: "Oak St", city: "Chicago", state: "IL", zip: "60601" },
    { name: "Pine St", city: "San Francisco", state: "CA", zip: "94101" },
  ];

  function showSuggestions() {
    const input = streetLocation.value.trim().toLowerCase();
    streetSuggestions.innerHTML = "";

    if (input.length < 1) {
      streetSuggestions.style.display = "none";
      return;
    }

    const matches = streetData.filter((street) =>
      street.name.toLowerCase().includes(input)
    );

    if (matches.length === 0) {
      streetSuggestions.style.display = "none";
      return;
    }

    matches.forEach((street) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = street.name;
      li.addEventListener("click", function () {
        streetLocation.value = street.name;
        cityLocation.value = street.city;
        stateLocation.value = street.state;
        zipLocation.value = street.zip;

        streetSuggestions.style.display = "none";
        arrowIcon.classList.replace("bi-chevron-up", "bi-chevron-down");
      });
      streetSuggestions.appendChild(li);
    });

    streetSuggestions.style.display = "block";
    arrowIcon.classList.replace("bi-chevron-down", "bi-chevron-up");
  }

  streetLocation.addEventListener("input", showSuggestions);
  streetLocation.addEventListener("focus", showSuggestions);

  streetDropdownArrow.addEventListener("click", function () {
    if (streetSuggestions.style.display === "block") {
      streetSuggestions.style.display = "none";
      arrowIcon.classList.replace("bi-chevron-up", "bi-chevron-down");
    } else {
      showSuggestions();
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !streetLocation.contains(event.target) &&
      !streetSuggestions.contains(event.target) &&
      !streetDropdownArrow.contains(event.target)
    ) {
      streetSuggestions.style.display = "none";
      arrowIcon.classList.replace("bi-chevron-up", "bi-chevron-down");
    }
  });
});

//TOAST DATA
document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const saveToast = document.getElementById("saveToast");

  function showToast(toastElement) {
    toastElement.style.opacity = "0";
    toastElement.style.transform = "translateX(100%)";
    toastElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    toastElement.classList.add("show");

    setTimeout(() => {
      toastElement.style.opacity = "1";
      toastElement.style.transform = "translateX(0)";
    }, 10);

    setTimeout(() => {
      toastElement.style.opacity = "0";
      toastElement.style.transform = "translateX(100%)";
    }, 3000);

    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 3500);
  }

  saveButton.addEventListener("click", function () {
    showToast(saveToast);
  });
});

//CUSTOM DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("dropdownStatus");
  const dropdownOptions = document.getElementById("dropdownStatusOptions");
  const selectedValue = document.getElementById("dropdownStatusText");
  const hiddenSelect = document.getElementById("dropdownStatusSelect");

  function toggleDropdown() {
    const isOpen = dropdown.classList.contains("active");

    if (isOpen) {
      dropdownOptions.style.display = "none";
      dropdown.classList.remove("active");
      dropdown.setAttribute("aria-expanded", "false");
    } else {
      dropdownOptions.style.display = "block";
      dropdown.classList.add("active");
      dropdown.setAttribute("aria-expanded", "true");
    }
  }

  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleDropdown();
  });

  dropdownOptions.querySelectorAll(".dropdown-option").forEach((option) => {
    option.addEventListener("click", function (event) {
      event.stopPropagation();

      selectedValue.textContent = this.textContent.trim();
      selectedValue.style.color = "#212529";

      dropdownOptions.querySelectorAll(".dropdown-option").forEach((opt) => {
        opt.classList.remove("selected");
      });

      this.classList.add("selected");

      hiddenSelect.value = this.getAttribute("data-value");

      dropdownOptions.style.display = "none";
      dropdown.classList.remove("active");
      dropdown.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdown.contains(event.target) &&
      !dropdownOptions.contains(event.target)
    ) {
      dropdownOptions.style.display = "none";
      dropdown.classList.remove("active");
      dropdown.setAttribute("aria-expanded", "false");
    }
  });
});
