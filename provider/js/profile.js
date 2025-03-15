// MODAL PROGRAM
document.addEventListener("DOMContentLoaded", function () {
  function setupDropdown(dropdownId, optionsId, textId, selectId) {
    const dropdown = document.getElementById(dropdownId);
    const dropdownOptions = document.getElementById(optionsId);
    const selectedValue = document.getElementById(textId);
    const hiddenSelect = document.getElementById(selectId);

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
  }

  setupDropdown(
    "dropdownStatus",
    "dropdownStatusOptions",
    "dropdownStatusText",
    "dropdownStatusSelect"
  );

  setupDropdown(
    "programDropdown",
    "programDropdownOptions",
    "programText",
    "programSelect"
  );

  setupDropdown(
    "pricingDropdown",
    "pricingDropdownOptions",
    "pricingPeriodText",
    "pricingPeriodSelect"
  );

  let currentRow = null;
  const detailsContainer = document.getElementById("selectedProgramDetails");

  document
    .getElementById("btnAddProgram")
    .addEventListener("click", function () {
      const programText = document
        .getElementById("programText")
        .textContent.trim();
      const availableValue = document.getElementById("availableSelect").value;
      const priceValue = document.getElementById("currencyInput").value;
      const pricingPeriodText = document
        .getElementById("pricingPeriodText")
        .textContent.trim();

      if (currentRow) {
        currentRow.querySelector(".program-col span.d-block").textContent =
          programText;
        currentRow.querySelector(
          ".available-col .available-count"
        ).textContent = availableValue;
        currentRow.querySelector(
          ".price-col span.d-block"
        ).textContent = `$${priceValue} / ${pricingPeriodText}`;
        const modalElement = document.getElementById("programModal");
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
        currentRow = null;
      } else {
        const programContainer = document.createElement("div");
        programContainer.classList.add(
          "program-container",
          "col-lg-12",
          "m-auto",
          "mb-3",
          "card",
          "border-0"
        );

        const programRow = document.createElement("div");
        programRow.classList.add(
          "d-flex",
          "flex-column",
          "flex-sm-row",
          "align-items-sm-start",
          "align-items-md-center",
          "program-row",
          "p-2"
        );

        const programCol = createColumn(
          "program-col",
          `<span class="small text-muted">Program: </span><span class="d-block mt-2">${programText}</span>`
        );
        const availableCol = createColumn(
          "available-col",
          `<span class="small text-muted">Available: </span><span class="d-block mt-2 available-count">${availableValue}</span>`
        );
        const priceCol = createColumn(
          "price-col",
          `<span class="small text-muted">Price: </span><span class="d-block mt-2">$${priceValue} / ${pricingPeriodText}</span>`
        );
        const actionsCol = createColumn(
          "actions-col",
          `
          <i class="bi bi-pencil text-primary edit-icon me-2" style="cursor: pointer;" aria-label="Edit"></i>
          <i class="bi bi-trash delete-icon text-danger" style="cursor: pointer;" aria-label="Delete"></i>
        `
        );

        programRow.appendChild(programCol);
        programRow.appendChild(availableCol);
        programRow.appendChild(priceCol);
        programRow.appendChild(actionsCol);

        programContainer.appendChild(programRow);
        detailsContainer.appendChild(programContainer);
      }

      removeExistingCheckbox();
      addCheckboxToEnd();
    });

  function createColumn(className, content) {
    const col = document.createElement("div");
    col.classList.add("flex-fill", "p-2", className);
    col.innerHTML = content;
    return col;
  }

  document
    .querySelector('[data-bs-target="#programModal"]')
    .addEventListener("click", function () {
      currentRow = null;

      document.getElementById("programText").textContent = "Select value";
      document.getElementById("availableSelect").value = "0";
      document.getElementById("currencyInput").value = "100";
      document.getElementById("pricingPeriodText").textContent = "Select value";
    });

  document
    .getElementById("selectedProgramDetails")
    .addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("delete-icon")) {
        const programContainer = event.target.closest(".program-container");
        if (programContainer) {
          programContainer.remove();
        }
      }

      if (event.target && event.target.classList.contains("edit-icon")) {
        const programContainer = event.target.closest(".program-container");
        if (programContainer) {
          const programText = programContainer
            .querySelector(".program-col span.d-block")
            .textContent.trim();
          const availableValue = programContainer
            .querySelector(".available-col .available-count")
            .textContent.trim();
          const priceValue = programContainer
            .querySelector(".price-col span.d-block")
            .textContent.trim()
            .split(" / ")[0]
            .replace("$", "");
          const pricingPeriodText = programContainer
            .querySelector(".price-col span.d-block")
            .textContent.trim()
            .split(" / ")[1]
            .trim();

          document.getElementById("programText").textContent = programText;
          document.getElementById("availableSelect").value = availableValue;
          document.getElementById("currencyInput").value = priceValue;
          document.getElementById("pricingPeriodSelect").value =
            pricingPeriodText;
          document.getElementById("pricingPeriodText").textContent =
            pricingPeriodText;

          const modalElement = document.getElementById("programModal");
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }

          currentRow = programContainer;
        }
      }
    });

  function createCheckboxRow() {
    const checkboxRow = document.createElement("div");
    checkboxRow.classList.add("col-lg-12", "m-auto");

    const label = document.createElement("label");
    label.classList.add("form-check-label", "w-100", "actions-col");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("form-check-input", "me-2");
    checkboxInput.name = "show_available";
    checkboxInput.value = "1";
    checkboxInput.id = "id_show_available";
    checkboxInput.checked = true;
    checkboxInput.setAttribute("data-has-listeners", "true");

    const span = document.createElement("span");
    span.classList.add("text-input");
    span.textContent = "Show available openings to users";

    label.appendChild(checkboxInput);
    label.appendChild(span);
    checkboxRow.appendChild(label);

    return checkboxRow;
  }

  function removeExistingCheckbox() {
    const existingCheckboxRow = document.querySelector(
      ".col-lg-12.m-auto .form-check-label"
    );
    if (existingCheckboxRow) {
      existingCheckboxRow.remove();
    }
  }

  function addCheckboxToEnd() {
    const checkboxRow = createCheckboxRow();
    detailsContainer.appendChild(checkboxRow);
  }

  addCheckboxToEnd();

  document
    .getElementById("selectedProgramDetails")
    .addEventListener("change", function (event) {
      if (event.target && event.target.id === "id_show_available") {
        document.querySelectorAll(".available-count").forEach((el) => {
          el.style.opacity = event.target.checked ? "1" : "0";
        });
      }
    });
});

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

// PRICES SET DAYS / FROM / TO
document.addEventListener("DOMContentLoaded", function () {
  const scheduleBlocks = document.getElementById("scheduleBlocks");
  const addScheduleBlockButton = document.getElementById("addScheduleBlock");
  const scheduleBlocks1 = document.getElementById("scheduleBlocks1");
  const addScheduleBlockButton1 = document.getElementById("addScheduleBlock1");

  function createScheduleBlock(container) {
    const block = document.createElement("div");
    block.classList.add("row", "g-3", "mt-2", "schedule-block");

    block.innerHTML = `
      <div class="col-md-5">
        <div class="mb-2 small text-muted">Set day(s)</div>
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle w-100 dropdownMenuButton" type="button">
            Select Days
          </button><i class="bi bi-chevron-down ms-2 position-absolute me-2 mt-2 end-0"></i>
          <ul class="dropdown-menu w-100 dropdownMenu mt-1 p-2 border-primary d-flex flex-column d-none">
            <li class="d-flex justify-content-between flex-row w-100 border-bottom">
              <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Mon-Fri">Mon-Fri</label>
              <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Mon-Sun">Mon-Sun</label>
              <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Sat-Sun">Sat-Sun</label>
            </li>
            <li class="d-flex flex-wrap w-100">
              <ul class="d-flex flex-row w-100 ps-0">
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Mon">Mon</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Tue">Tue</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Wed">Wed</label>
                </li>
              </ul>
              <ul class="d-flex flex-row w-100 ps-0">
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Thu">Thu</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Fri">Fri</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Sat">Sat</label>
                </li>
              </ul>
              <ul class="d-flex flex-row w-100 ps-0">
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Sun">Sun</label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-3 position-relative">
        <label class="form-label small text-muted">From</label>
        <input type="time" class="form-control timeInput">
        <input type="text" class="form-control ampm-display d-none" readonly>
      </div>

      <div class="col-md-3 position-relative">
        <label class="form-label small text-muted">To</label>
        <input type="time" class="form-control timeInput">
        <input type="text" class="form-control ampm-display d-none" readonly>
      </div>

      <div class="col-sm-1 d-flex flex-column justify-content-center align-items-end align-items-sm-center">
        <div class="mb-2 d-none d-sm-block opacity-0">Text</div>
        <i class="bi bi-trash text-danger remove-location" style="cursor: pointer"></i>
      </div>
    `;

    container.appendChild(block);

    addDropdownFunctionality(block);
    addTimeFunctionality(block);
    addRemoveFunctionality(block);
  }

  function addDropdownFunctionality(block) {
    const dropdownButton = block.querySelector(".dropdownMenuButton");
    const dropdownMenu = block.querySelector(".dropdownMenu");
    const chevronIcon = block.querySelector(".bi-chevron-down");
    const options = block.querySelectorAll(".select-day");

    dropdownButton.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdownMenu.classList.toggle("d-none");
      dropdownMenu.classList.toggle("d-flex");
      dropdownMenu.classList.toggle("flex-row");

      if (dropdownMenu.classList.contains("d-flex")) {
        chevronIcon.style.transform = "rotate(180deg)";
      } else {
        chevronIcon.style.transform = "rotate(0deg)";
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        dropdownButton.innerHTML = `${this.dataset.value} <i class="bi bi-chevron-down ms-2"></i>`;
        dropdownMenu.classList.add("d-none");
        dropdownMenu.classList.remove("d-flex", "flex-row");

        chevronIcon.style.transform = "rotate(0deg)";
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !dropdownButton.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.add("d-none");
        dropdownMenu.classList.remove("d-flex", "flex-row");

        chevronIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  function addTimeFunctionality(block) {
    const timeInputs = block.querySelectorAll(".timeInput");

    timeInputs.forEach((timeInput) => {
      const amPmDisplay = timeInput.nextElementSibling;

      timeInput.addEventListener("input", function () {
        if (timeInput.value) {
          let [hours, minutes] = timeInput.value.split(":");
          let hoursInt = parseInt(hours, 10);
          let amPm = hoursInt >= 12 ? "PM" : "AM";

          if (hoursInt > 12) {
            hoursInt -= 12;
          } else if (hoursInt === 0) {
            hoursInt = 12;
          }

          amPmDisplay.value = amPm;
          amPmDisplay.classList.remove("d-none");
        } else {
          amPmDisplay.classList.add("d-none");
        }
      });
    });
  }

  function addRemoveFunctionality(block) {
    const removeButton = block.querySelector(".remove-location");

    if (removeButton) {
      removeButton.addEventListener("click", function () {
        block.remove();
        checkDefaultBlock();
      });
    }
  }

  function checkDefaultBlock() {
    if (scheduleBlocks.children.length === 0) {
      createScheduleBlock(scheduleBlocks);
    }
    if (scheduleBlocks1.children.length === 0) {
      createScheduleBlock(scheduleBlocks1);
    }
  }

  const existingBlocks = document.querySelectorAll(".schedule-block");
  existingBlocks.forEach((block) => {
    addDropdownFunctionality(block);
    addTimeFunctionality(block);
    addRemoveFunctionality(block);
  });

  addScheduleBlockButton.addEventListener("click", function () {
    createScheduleBlock(scheduleBlocks);
  });

  addScheduleBlockButton1.addEventListener("click", function () {
    createScheduleBlock(scheduleBlocks1);
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
// document.addEventListener("DOMContentLoaded", function () {
// const resetButton = document.getElementById("resetButton");
// const resetToast = document.getElementById("resetToast");

//   const saveButton = document.getElementById("saveButton");
//   const saveToast = document.getElementById("saveToast");

//   function showToast(toastElement) {
//     toastElement.style.opacity = "0";
//     toastElement.style.transform = "translateX(100%)";
//     toastElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

//     toastElement.classList.add("show");

//     setTimeout(() => {
//       toastElement.style.opacity = "1";
//       toastElement.style.transform = "translateX(0)";
//     }, 10);

//     setTimeout(() => {
//       toastElement.style.opacity = "0";
//       toastElement.style.transform = "translateX(100%)";
//     }, 3000);

//     setTimeout(() => {
//       toastElement.classList.remove("show");
//     }, 3500);
//   }

// resetButton.addEventListener("click", function () {
//   showToast(resetToast);
// });

//   saveButton.addEventListener("click", function () {
//     showToast(saveToast);
//   });
// });
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

// ADD PHOTO/VIDEO
document.addEventListener("DOMContentLoaded", function () {
  const addPhotoButton = document.getElementById("addPhotoButton");
  const photoInput = document.getElementById("photoInput");
  const photoGallery = document.getElementById("photoGallery");

  addPhotoButton.addEventListener("click", () => {
    photoInput.click();
  });

  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
      const col = document.createElement("div");
      col.classList.add("col");

      const box = document.createElement("div");
      box.classList.add("box", "w-100");

      const boxInner = document.createElement("div");
      boxInner.classList.add("boxInner", "position-relative");

      const fileURL = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.classList.add("img-fluid", "rounded", "w-100");
        img.src = fileURL;

        boxInner.appendChild(img);
      } else if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.classList.add("img-fluid", "rounded", "w-100");
        video.src = fileURL;
        video.controls = true;

        boxInner.appendChild(video);
      }

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add(
        "bi",
        "bi-trash",
        "delete-image",
        "text-danger",
        "position-absolute"
      );
      deleteIcon.style.cursor = "pointer";
      deleteIcon.setAttribute("aria-label", "Delete");

      deleteIcon.addEventListener("click", () => {
        photoGallery.removeChild(col);
      });

      boxInner.appendChild(deleteIcon);
      box.appendChild(boxInner);
      col.appendChild(box);

      photoGallery.appendChild(col);
    }
  });

  photoGallery.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-image")) {
      const col = e.target.closest(".col");
      if (col) {
        photoGallery.removeChild(col);
      }
    }
  });
});

// ADD TEAM MEMBER
document.addEventListener("DOMContentLoaded", function () {
  const addTeamButton = document.getElementById("addTeamButton");
  const addMemberButtonModal = document.getElementById("addMemberButtonModal");
  const addMemberModal = new bootstrap.Modal(
    document.getElementById("addMemberModal")
  );
  const teamContainer = document.getElementById("teamContainer");

  const avatarUpload = document.getElementById("avatarUpload1");
  const avatarPreview = document.getElementById("avatarPreview1");

  avatarUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  teamContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-card")) {
      const card = event.target.closest(".col-md-6");
      if (card) {
        card.remove();
      }
    }
  });

  addTeamButton.addEventListener("click", function () {
    addMemberModal.show();
  });

  addMemberButtonModal.addEventListener("click", function () {
    const memberName = document.getElementById("memberName").value;
    const memberRole = document.getElementById("memberRole").value;
    const memberDescription =
      document.getElementById("memberDescription").value;

    const avatarSrc = avatarPreview.src || "img/profile-avatar.jpg";

    const newCard = document.createElement("div");
    newCard.classList.add("col-md-6");

    newCard.innerHTML = `
      <div class="card card-team h-100">
        <div class="card-body d-flex flex-column flex-sm-row">
          <img class="rounded-circle img-fluid me-3 mb-2 mb-sm-0 flex-shrink-0" loading="lazy" src="${avatarSrc}" alt="${memberName}">
          <div class="d-flex flex-column flex-grow-1">
            <p class="h5 mb-1">${memberName}</p>
            <p class="text-muted small mb-0">${memberRole}</p>
            <p class="mt-2 text-content">
              ${memberDescription}
            </p>
            <div class="py-sm-0 show-more text-primary mb-1">
              Show More
            </div>
          </div>
          <i class="bi bi-trash delete-card text-danger" style="cursor: pointer" aria-label="Delete"></i>
        </div>
      </div>
    `;

    teamContainer.appendChild(newCard);

    addMemberModal.hide();

    document.getElementById("memberName").value = "";
    document.getElementById("memberRole").value = "";
    document.getElementById("memberDescription").value = "";
    avatarPreview.src = "img/avatar-people.svg";

    const newShowMoreButton = newCard.querySelector(".show-more");
    const newTextContent = newCard.querySelector(".text-content");

    const lineHeight = parseFloat(
      window.getComputedStyle(newTextContent).lineHeight
    );
    const maxHeight = parseFloat(
      window.getComputedStyle(newTextContent).maxHeight
    );
    const linesCount = maxHeight / lineHeight;

    if (newTextContent.scrollHeight > newTextContent.clientHeight) {
      newShowMoreButton.style.display = "inline-block";

      newShowMoreButton.addEventListener("click", function () {
        newTextContent.classList.toggle("expanded");

        if (newTextContent.classList.contains("expanded")) {
          newShowMoreButton.textContent = "Show Less";
        } else {
          newShowMoreButton.textContent = "Show More";
        }
      });
    } else {
      newShowMoreButton.style.display = "none";
    }

    const deleteButton = newCard.querySelector(".delete-card");
    deleteButton.addEventListener("click", function () {
      teamContainer.removeChild(newCard);
    });
  });
});

// SHOW / HIDE Current Card Members
document.addEventListener("DOMContentLoaded", function () {
  initShowMoreFeature();

  document.querySelectorAll(".accordion-collapse").forEach((accordion) => {
    accordion.addEventListener("shown.bs.collapse", function () {
      initShowMoreFeature();
    });
  });
});

function initShowMoreFeature() {
  document.querySelectorAll(".text-wrap").forEach(function (container) {
    const textContent = container.querySelector(".text-content");
    const showMoreButton = container.querySelector(".show-more");

    if (!textContent || !showMoreButton) return;

    const lineHeight = parseFloat(getComputedStyle(textContent).lineHeight);
    const maxCollapsedHeight = lineHeight * 3;

    if (textContent.scrollHeight <= maxCollapsedHeight) {
      showMoreButton.style.display = "none";
      return;
    } else {
      showMoreButton.style.display = "block";
    }

    textContent.style.height = maxCollapsedHeight + "px";
    textContent.style.overflow = "hidden";

    showMoreButton.replaceWith(showMoreButton.cloneNode(true));
    const newShowMoreButton = container.querySelector(".show-more");

    newShowMoreButton.addEventListener("click", function () {
      if (textContent.style.overflow === "hidden") {
        textContent.style.height = textContent.scrollHeight + "px";
        textContent.style.overflow = "visible";
        newShowMoreButton.textContent = "Show Less";
      } else {
        textContent.style.height = maxCollapsedHeight + "px";
        textContent.style.overflow = "hidden";
        newShowMoreButton.textContent = "Show More";
      }
    });
  });
}
