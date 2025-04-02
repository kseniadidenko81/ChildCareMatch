// Modal program
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

  function addCheckbox() {
    if (!document.getElementById("checkboxRowContainer")) {
      const checkboxRow = createCheckboxRow();
      checkboxRow.id = "checkboxRowContainer";
      detailsContainer.appendChild(checkboxRow);
    }
  }

  function createColumn(className, innerHTML) {
    const col = document.createElement("div");
    col.classList.add("flex-fill", className, "p-2");
    col.innerHTML = innerHTML;
    return col;
  }

  function createCheckboxRow() {
    const checkboxRow = document.createElement("div");
    checkboxRow.classList.add("col-lg-10", "m-auto");

    const label = document.createElement("label");
    label.classList.add("form-check-label", "w-100", "actions-col");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("form-check-input", "me-2");
    checkboxInput.name = "show_available";
    checkboxInput.value = "1";
    checkboxInput.id = "id_show_available";
    checkboxInput.checked = true;

    const span = document.createElement("span");
    span.classList.add("text-input");
    span.textContent = "Show available openings to users";

    const tooltipIcon = document.createElement("i");
    tooltipIcon.classList.add("bi", "bi-info-circle", "ms-2");
    tooltipIcon.setAttribute("data-bs-toggle", "tooltip");
    tooltipIcon.setAttribute(
      "title",
      "If you don't want available openings to be visible, hide them."
    );

    label.appendChild(checkboxInput);
    label.appendChild(span);
    label.appendChild(tooltipIcon);
    checkboxRow.appendChild(label);

    return checkboxRow;
  }

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
          "col-lg-10",
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
          <i class="bi bi-pencil text-primary edit-icon me-2" style="cursor: pointer;" aria-label="Edit" data-bs-toggle="tooltip" title="Edit"></i>
          <i class="bi bi-trash delete-icon text-danger" style="cursor: pointer;" aria-label="Delete" data-bs-toggle="tooltip" title="Delete"></i>
        `
        );

        programRow.appendChild(programCol);
        programRow.appendChild(availableCol);
        programRow.appendChild(priceCol);
        programRow.appendChild(actionsCol);
        programContainer.appendChild(programRow);

        detailsContainer.insertBefore(
          programContainer,
          detailsContainer.firstChild
        );

        addCheckbox();
      }

      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );
      tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
    });

  document
    .getElementById("selectedProgramDetails")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-icon")) {
        const programContainer = event.target.closest(".program-container");
        if (programContainer) {
          programContainer.remove();

          checkIfAllProgramsDeleted();
        }
      }

      if (event.target.classList.contains("edit-icon")) {
        const programContainer = event.target.closest(".program-container");
        if (programContainer) {
          document.getElementById("programText").textContent = programContainer
            .querySelector(".program-col span.d-block")
            .textContent.trim();
          document.getElementById("availableSelect").value = programContainer
            .querySelector(".available-col .available-count")
            .textContent.trim();
          document.getElementById("currencyInput").value = programContainer
            .querySelector(".price-col span.d-block")
            .textContent.trim()
            .split(" / ")[0]
            .replace("$", "");
          document.getElementById("pricingPeriodText").textContent =
            programContainer
              .querySelector(".price-col span.d-block")
              .textContent.trim()
              .split(" / ")[1]
              .trim();

          const modalElement = document.getElementById("programModal");
          if (modalElement) {
            new bootstrap.Modal(modalElement).show();
          }

          currentRow = programContainer;
        }
      }
    });

  function checkIfAllProgramsDeleted() {
    if (document.querySelectorAll(".program-container").length === 0) {
      const checkboxRow = document.getElementById("checkboxRowContainer");
      if (checkboxRow) {
        checkboxRow.remove();
      }
    }
  }

  document
    .querySelector('[data-bs-target="#programModal"]')
    .addEventListener("click", function () {
      currentRow = null;

      document.getElementById("programText").textContent = "Select value";
      document.getElementById("availableSelect").value = "0";
      document.getElementById("currencyInput").value = "0";
      document.getElementById("pricingPeriodText").textContent = "Select value";
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
