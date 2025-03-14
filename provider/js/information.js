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

// CUSTOM DROPDOWN
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
    const dropdownOptions = dropdown.nextElementSibling;
    const arrow = dropdown.querySelector(".dropdown-arrow i");

    dropdown.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdownOptions.classList.toggle("show");

      arrow.classList.toggle("rotate");

      document.querySelectorAll(".dropdown-options").forEach((opt) => {
        if (opt !== dropdownOptions) {
          opt.classList.remove("show");
          opt.previousElementSibling
            .querySelector(".dropdown-arrow i")
            .classList.remove("rotate");
        }
      });
    });

    dropdownOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown.innerHTML = `${option.innerHTML} <span class="dropdown-arrow"><i class="bi bi-chevron-down"></i></span>`;
        dropdownOptions.classList.remove("show");
        arrow.classList.remove("rotate");
      });
    });

    document.addEventListener("click", () => {
      dropdownOptions.classList.remove("show");
      arrow.classList.remove("rotate");
    });
  });
});

// CHECKBOX COLOR
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".form-check-input");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const label = this.closest("label");
      const textSpan = label.querySelector(".text-input");

      if (this.checked) {
        textSpan.style.color = "#6750f9";
      } else {
        textSpan.style.color = "";
      }
    });
  });
});

// PERMIT NUMBER
document.getElementById("permitNumber").addEventListener("input", function (e) {
  let value = e.target.value;

  value = value.replace(/[^0-9#]/g, "");

  if (value.charAt(0) === "#") {
    value = "#" + value.slice(1, 7);
  } else {
    value = value.slice(0, 6);
  }

  e.target.value = value;
});

// PHONE - FAX
function formatPhoneOrFax(input) {
  let value = input.value;

  value = value.replace(/[^\d]/g, "");

  if (value.length > 3 && value.length <= 6) {
    value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
  } else if (value.length > 6) {
    value = `(${value.substring(0, 3)}) ${value.substring(
      3,
      6
    )}-${value.substring(6, 10)}`;
  }

  input.value = value;
}

document.getElementById("phone").addEventListener("input", function (e) {
  formatPhoneOrFax(e.target);
});

document.getElementById("fax").addEventListener("input", function (e) {
  formatPhoneOrFax(e.target);
});
