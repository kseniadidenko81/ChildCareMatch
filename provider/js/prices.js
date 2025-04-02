// MODAL PROGRAM
document.addEventListener("DOMContentLoaded", function () {
  const programModal = document.getElementById("programModal");
  const saveProgramButton = document.getElementById("saveProgram");
  const programPeriodSelect = document.getElementById("programPeriodSelect");
  const programPeriodSelect1 = document.getElementById("programPeriodSelect1");
  const programAvailable = document.getElementById("programAvailable");
  const programPrice = document.getElementById("programPrice");
  const container = document.getElementById("selectedProgramDetails");

  let editingProgramContainer = null;

  document
    .querySelector("[data-bs-toggle='modal']")
    .addEventListener("click", function () {
      editingProgramContainer = null;
      resetForm();
    });

  addCheckboxToEnd();

  programModal.addEventListener("shown.bs.modal", function () {
    if (editingProgramContainer) {
      const programName = editingProgramContainer
        .querySelector(".program-col span.d-block")
        .textContent.trim();
      const available = editingProgramContainer
        .querySelector(".available-col .available-count")
        .textContent.trim();
      const priceText = editingProgramContainer
        .querySelector(".price-col span.d-block")
        .textContent.trim();
      const [price, period] = priceText.split(" / ");

      programPeriodSelect.value = programName;
      programPeriodSelect1.value = period.trim();
      programAvailable.value = available;
      programPrice.value = price.replace("$", "").trim();
    }
  });

  saveProgramButton.addEventListener("click", function () {
    const period1 = programPeriodSelect.value;
    const period2 = programPeriodSelect1.value;
    const available = programAvailable.value;
    const price = programPrice.value;

    if (available === "" || price === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (editingProgramContainer) {
      editingProgramContainer.querySelector(
        ".program-col span.d-block"
      ).textContent = period1;
      editingProgramContainer.querySelector(
        ".available-col .available-count"
      ).textContent = available;
      editingProgramContainer.querySelector(
        ".price-col span.d-block"
      ).textContent = `$${price} / ${period2}`;
      editingProgramContainer = null;
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

      programContainer.innerHTML = `
        <div class="d-flex flex-column flex-sm-row align-items-sm-start align-items-md-center program-row p-2">
          <div class="flex-fill p-2 program-col">
            <span class="small text-muted">Program: </span>
            <span class="d-block mt-2">${period1}</span>
          </div>
          <div class="flex-fill p-2 available-col">
            <span class="small text-muted">Available: </span>
            <span class="d-block mt-2 available-count">${available}</span>
          </div>
          <div class="flex-fill p-2 price-col">
            <span class="small text-muted">Price: </span>
            <span class="d-block mt-2">$${price} / ${period2}</span>
          </div>
          <div class="flex-fill p-2 actions-col">
            <i class="bi bi-pencil text-primary edit-icon me-2" style="cursor: pointer" aria-label="Edit"></i>
            <i class="bi bi-trash delete-icon text-danger" style="cursor: pointer" aria-label="Delete"></i>
          </div>
        </div>
      `;

      container.insertBefore(
        programContainer,
        container.querySelector(".col-lg-12.m-auto")
      );
    }

    resetForm();
    bootstrap.Modal.getInstance(programModal).hide();
  });

  function resetForm() {
    programPeriodSelect.value = "Select a program";
    programPeriodSelect1.value = "Select a period";
    programAvailable.value = "0";
    programPrice.value = "0";
  }

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

    const span = document.createElement("span");
    span.classList.add("text-input");
    span.textContent = "Show available openings to users";

    label.appendChild(checkboxInput);
    label.appendChild(span);
    checkboxRow.appendChild(label);

    return checkboxRow;
  }

  function addCheckboxToEnd() {
    container
      .querySelectorAll(".col-lg-12.m-auto label.form-check-label")
      .forEach((el) => {
        el.parentElement.remove();
      });

    const checkboxRow = createCheckboxRow();
    container.appendChild(checkboxRow);
  }

  container.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-icon")) {
      const programContainer = event.target.closest(".program-container");
      if (programContainer) {
        editingProgramContainer = programContainer;

        programPeriodSelect.value = programContainer
          .querySelector(".program-col span.d-block")
          .textContent.trim();
        programAvailable.value = programContainer
          .querySelector(".available-col .available-count")
          .textContent.trim();

        const priceText = programContainer
          .querySelector(".price-col span.d-block")
          .textContent.trim();
        const [price, period] = priceText.split(" / ");
        programPrice.value = price.replace("$", "").trim();
        programPeriodSelect1.value = period.trim();

        const modal = new bootstrap.Modal(programModal);
        modal.show();
      }
    }

    if (event.target.classList.contains("delete-icon")) {
      const programContainer = event.target.closest(".program-container");
      programContainer.remove();

      if (!container.querySelector(".program-container")) {
        const checkboxRow = container.querySelector(".col-lg-12.m-auto");
        if (checkboxRow) {
          checkboxRow.remove();
        }
      }
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
