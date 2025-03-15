document.addEventListener("DOMContentLoaded", function () {
  function setupDropdown(dropdownId, optionsId, textId, selectId) {
    const dropdown = document.getElementById(dropdownId);
    const dropdownOptions = document.getElementById(optionsId);
    const selectedValue = document.getElementById(textId);
    const hiddenSelect = document.getElementById(selectId);

    function toggleDropdown() {
      dropdownOptions.style.display = dropdown.classList.toggle("active")
        ? "block"
        : "none";
      dropdown.setAttribute(
        "aria-expanded",
        dropdown.classList.contains("active")
      );
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

  const dropdownButton = document.querySelector(".dropdown-toggle");
  const dayLabels = document.querySelectorAll(".dropdown-header");
  let selectedDays = [];

  function updateButton() {
    dropdownButton.innerHTML = selectedDays.length
      ? selectedDays.join(", ")
      : "Select Days";
  }

  dayLabels.forEach((label) => {
    label.addEventListener("click", function () {
      const day = label.dataset.value;

      if (selectedDays.includes(day)) {
        selectedDays = selectedDays.filter((d) => d !== day);
      } else {
        selectedDays.push(day);
      }

      updateButton();
    });
  });

  setupDropdown(
    "classDropdown2",
    "classDropdownOptions2",
    "classText2",
    "classSelect2"
  );
  setupDropdown(
    "programDropdown2",
    "programDropdownOptions2",
    "programText2",
    "programSelect2"
  );
  setupDropdown(
    "pricingDropdown2",
    "pricingDropdownOptions2",
    "pricingPeriodText2",
    "pricingPeriodSelect2"
  );

  document
    .getElementById("addScheduleBlock2")
    ?.addEventListener("click", function () {
      const scheduleBlock = document.createElement("div");
      scheduleBlock.classList.add("row", "g-3", "schedule-block");

      scheduleBlock.innerHTML = `
        <div class="col-sm-5">
          <label class="mb-2 small text-muted">Set day(s)</label>
          <div class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle w-100 dropdownMenuButton" type="button">
              <span>Select Days</span>
            </button>
          </div>
        </div>
        <div class="col-sm-3 position-relative">
          <label class="form-label small text-muted">From</label>
          <input type="time" class="form-control timeInput from" />
        </div>
        <div class="col-sm-3 position-relative">
          <label class="form-label small text-muted">To</label>
          <input type="time" class="form-control timeInput to" />
        </div>
        <div class="col-sm-1 d-flex flex-column justify-content-center align-items-end align-items-sm-center">
          <i class="bi bi-trash text-danger remove-location" style="cursor: pointer" onclick="removeScheduleBlock(this)"></i>
        </div>
      `;
      document.getElementById("scheduleBlocks3").appendChild(scheduleBlock);
    });

  function removeScheduleBlock(element) {
    element.closest(".schedule-block")?.remove();
  }

  let currentRow = null;
  const detailsContainer = document.getElementById("selectedProgramDetails2");

  document
    .getElementById("btnAddProgram2")
    .addEventListener("click", function () {
      const classText = document
        .getElementById("classText2")
        .textContent.trim();
      const programText = document
        .getElementById("programText2")
        .textContent.trim();
      const availableValue = document.getElementById("availableSelect2").value;
      const priceValue = document.getElementById("currencyInput2").value;
      const pricingPeriodText = document
        .getElementById("pricingPeriodText2")
        .textContent.trim();

      const scheduleBlocks = document.querySelectorAll(".schedule-block");
      let daysTimes = "";

      let lastDays = "",
        lastFromTime = "",
        lastToTime = "";
      scheduleBlocks.forEach((block, index) => {
        const daysElement = block.querySelector(".dropdown .btn span");
        const days = daysElement ? daysElement.textContent.trim() : "";

        const fromTime = block.querySelector(".timeInput.from").value || null;
        const toTime = block.querySelector(".timeInput.to").value || null;

        if (index === scheduleBlocks.length - 1) {
          lastDays = days;
          lastFromTime = fromTime;
          lastToTime = toTime;
        }
      });

      if (lastDays) {
        daysTimes += `<div class="schedule-info">Days: ${lastDays}</div>`;
      }

      if (lastFromTime || lastToTime) {
        daysTimes += `<div class="schedule-info">From: ${
          lastFromTime || "Not specified"
        }, To: ${lastToTime || "Not specified"}</div>`;
      }

      const selectedDaysText = selectedDays.length
        ? selectedDays.join(", ")
        : "";
      if (selectedDaysText) {
        daysTimes += `<div class="schedule-info">Days: ${selectedDaysText}</div>`;
      }

      if (currentRow) {
        currentRow.querySelector(".class-col span.d-block").textContent =
          classText;
        currentRow.querySelector(".program-col span.d-block").textContent =
          programText;
        currentRow.querySelector(
          ".available-col .available-count"
        ).textContent = availableValue;
        currentRow.querySelector(
          ".price-col span.d-block"
        ).textContent = `$${priceValue} / ${pricingPeriodText}`;
        currentRow.querySelector(".schedule-col").innerHTML = daysTimes;

        closeModal();
        currentRow = null;
      } else {
        const programContainer = document.createElement("div");
        programContainer.classList.add(
          "program-container",
          "col-lg-10",
          "m-auto",
          "mb-3",
          "card",
          "border-0"
        );

        programContainer.innerHTML = `
        <div class="d-flex flex-column flex-md-row align-items-md-start program-row position-relative p-2">
          <div class="flex-fill class-col p-2">
            <span class="small text-muted">Class/Activity: </span>
            <span class="d-block mt-2">${classText}</span>
          </div>
          <div class="flex-fill program-col p-2">
            <span class="small text-muted">Program: </span>
            <span class="d-block mt-2">${programText}</span>
          </div>
          <div class="flex-fill available-col p-2">
            <span class="small text-muted">Available: </span>
            <span class="d-block mt-2 available-count">${availableValue}</span>
          </div>
          <div class="flex-fill price-col p-2">
            <span class="small text-muted">Price: </span>
            <span class="d-block mt-2">${priceValue} / ${pricingPeriodText}</span>
          </div>
          <div class="flex-fill schedule-col p-2">
            ${daysTimes}
          </div>
          <div class="flex-fill actions-col p-2">
            <span class="text-primary calendar-icon small me-2" style="cursor: pointer;" aria-label="Schedule">Show More</span>
            <i class="bi bi-pencil text-primary edit-icon me-2" style="cursor: pointer;" aria-label="Edit"></i>
            <i class="bi bi-trash delete-icon text-danger" style="cursor: pointer;" aria-label="Delete"></i>
          </div>
        </div>
      `;

        detailsContainer.appendChild(programContainer);
      }

      closeModal();
    });

  detailsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-icon")) {
      event.target.closest(".program-container").remove();
    }

    if (event.target.classList.contains("edit-icon")) {
      currentRow = event.target.closest(".program-container");

      document.getElementById("classText2").textContent = currentRow
        .querySelector(".class-col span.d-block")
        .textContent.trim();
      document.getElementById("programText2").textContent = currentRow
        .querySelector(".program-col span.d-block")
        .textContent.trim();
      document.getElementById("availableSelect2").value = currentRow
        .querySelector(".available-col .available-count")
        .textContent.trim();
      document.getElementById("currencyInput2").value = currentRow
        .querySelector(".price-col span.d-block")
        .textContent.trim()
        .split(" / ")[0]
        .replace("$", "");
      document.getElementById("pricingPeriodText2").textContent = currentRow
        .querySelector(".price-col span.d-block")
        .textContent.trim()
        .split(" / ")[1]
        .trim();

      const daysElement = currentRow.querySelector(
        ".schedule-col .schedule-info"
      );
      const daysText = daysElement ? daysElement.textContent.trim() : "";

      if (daysText.includes("Days:")) {
        selectedDays = daysText.replace("Days: ", "").split(", ");
      } else {
        selectedDays = [];
      }

      updateButton();

      openModal();
    }
  });

  detailsContainer.addEventListener("mouseover", function (event) {
    if (event.target.classList.contains("calendar-icon")) {
      const scheduleBlock = event.target
        .closest(".program-container")
        .querySelector(".schedule-col");

      scheduleBlock.style.opacity = "1";
      scheduleBlock.style.visibility = "visible";
    }
  });

  detailsContainer.addEventListener("mouseout", function (event) {
    if (event.target.classList.contains("calendar-icon")) {
      const scheduleBlock = event.target
        .closest(".program-container")
        .querySelector(".schedule-col");

      scheduleBlock.style.opacity = "0";
      scheduleBlock.style.visibility = "hidden";
    }
  });

  function openModal() {
    const modalElement = document.getElementById("programModal2");
    if (modalElement) {
      new bootstrap.Modal(modalElement).show();
    }
  }

  function closeModal() {
    const modalElement = document.getElementById("programModal2");
    if (modalElement) {
      bootstrap.Modal.getInstance(modalElement)?.hide();
    }
  }

  document.addEventListener("click", function (event) {
    const scheduleBlocks = document.querySelectorAll(".schedule-col");
    scheduleBlocks.forEach((scheduleBlock) => {
      if (
        !scheduleBlock.contains(event.target) &&
        !event.target.closest(".calendar-icon")
      ) {
        scheduleBlock.style.opacity = "0";
        scheduleBlock.style.visibility = "hidden";
      }
    });
  });

  document
    .querySelector('[data-bs-toggle="modal"][data-bs-target="#programModal2"]')
    .addEventListener("click", function () {
      document.querySelector("#classText2").textContent = "Select value";
      document.querySelector("#programText2").textContent = "Select value";
      document.querySelector("#availableSelect2").value = "0";

      document.querySelector("#fromTime7").value = "";
      document.querySelector("#toTime7").value = "";
      document.querySelector("#fromTimeAMPM7").value = "";
      document.querySelector("#toTimeAMPM7").value = "";

      const dayLabels = document.querySelectorAll(".dropdown-header");
      dayLabels.forEach((day) => {
        day.classList.remove("selected");
        day.style.backgroundColor = "";
      });

      const dayButton = document.querySelector(".dropdown-toggle");
      if (dayButton) {
        dayButton.textContent = "Select Days";
      }

      selectedDays = [];
      updateButton();

      const scheduleBlocks = document.querySelectorAll(
        "#scheduleBlocks3 .schedule-block"
      );
      scheduleBlocks.forEach((block) => {
        block.querySelector(".dropdown-toggle").textContent = "Select Days";
        block.querySelector(".from").value = "";
        block.querySelector(".to").value = "";
        block.querySelector("#fromTimeAMPM7").value = "";
        block.querySelector("#toTimeAMPM7").value = "";
        const dayButtons = block.querySelectorAll(".dropdown-header");
        dayButtons.forEach((day) => {
          day.classList.remove("selected");
          day.style.backgroundColor = "";
        });
      });

      document.querySelector("#currencyInput2").value = "100";
      document.querySelector("#pricingPeriodText2").textContent =
        "Select value";
      document.getElementById("pricingPeriodText2").textContent =
        "Select value";
    });
});
