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

      <div class="col-md-1 d-flex flex-column justify-content-center align-items-end align-items-md-center">
        <div class="mb-2 d-none d-md-block opacity-0">Text</div>
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
