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

// LANGUAGE
$(document).ready(function () {
  $("#selectedLanguages").click(function () {
    $("#languagesMenu").toggle();
  });

  $("#languagesMenu div").click(function () {
    var value = $(this).data("value");
    addLanguage(value);
    $(this).hide();
    $("#languagesMenu").hide();
  });

  function addLanguage(value) {
    $("#inputFieldLanguages").addClass("hidden");

    var languageHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeLanguage(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedLanguages").append(languageHtml);
  }

  window.removeLanguage = function (element, value) {
    $(element).parent().remove();
    $("#languagesMenu div[data-value='" + value + "']").show();

    if ($("#selectedLanguages .tag").length === 0) {
      $("#inputFieldLanguages").removeClass("hidden");
    }
  };

  $(document).click(function (event) {
    if (!$(event.target).closest(".dropdown").length) {
      $("#languagesMenu").hide();
    }
  });
});

//RESET TOAST DATA
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
