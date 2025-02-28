// Modal Waiting

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".btn-modal-waiting, .btn-modal-sent"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const program = button.getAttribute("data-program");
      const price = button.getAttribute("data-price");

      console.log("Program:", program);
      console.log("Price:", price);

      if (button.classList.contains("btn-modal-waiting")) {
        const programElement = document.querySelector("#modalProgram");
        const priceElement = document.querySelector("#modalPrice");

        if (programElement && priceElement) {
          programElement.innerText = program || "Not specified";
          priceElement.innerText = price || "Not specified";
        }
      } else if (button.classList.contains("btn-modal-sent")) {
        const programElement = document.querySelector("#modalProgramSend");
        const priceElement = document.querySelector("#modalPriceSend");

        if (programElement && priceElement) {
          programElement.innerText = program || "Not specified";
          priceElement.innerText = price || "Not specified";
        }
      }
    });
  });
});

// TOAST Message
document.addEventListener("DOMContentLoaded", function () {
  const toastMessage = document.getElementById("toastMessage");

  const showToast = (message) => {
    toastMessage.querySelector(".toast-body span").textContent = message;

    toastMessage.style.opacity = 0;
    toastMessage.style.transform = "translateX(100%)";
    toastMessage.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    toastMessage.classList.add("show");

    setTimeout(() => {
      toastMessage.style.opacity = 1;
      toastMessage.style.transform = "translateX(0)";
    }, 10);

    setTimeout(() => {
      toastMessage.style.opacity = 0;
      toastMessage.style.transform = "translateX(100%)";
    }, 3000);

    setTimeout(() => {
      toastMessage.classList.remove("show");
    }, 3500);
  };

  const joinWaitingListButton = document.getElementById(
    "sendApplicationBtnWaiting"
  );
  if (joinWaitingListButton) {
    joinWaitingListButton.addEventListener("click", function () {
      const message = joinWaitingListButton.getAttribute("data-message");
      showToast(message);
      const modal = document.getElementById("modalWaiting");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    });
  }

  const sendApplicationButton = document.getElementById(
    "sendApplicationBtnSent"
  );
  if (sendApplicationButton) {
    sendApplicationButton.addEventListener("click", function () {
      const message = sendApplicationButton.getAttribute("data-message");
      showToast(message);
      const modal = document.getElementById("modalTabSend");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
    });
  }
});

// Icon Heart
document.addEventListener("DOMContentLoaded", function () {
  const heartIcons = document.querySelectorAll(".heart-icon");

  heartIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      icon.classList.toggle("active");
    });
  });
});

// TIME
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

        amPmDisplay.value = `${hoursInt}:${minutes} ${amPm}`;
        amPmDisplay.classList.remove("d-none");
      } else {
        amPmDisplay.classList.add("d-none");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll(".d-flex");
  blocks.forEach((block) => addTimeFunctionality(block));
});

// DROPDOWN EMAIL

document.addEventListener("DOMContentLoaded", function () {
  const customDropdown = document.getElementById("placeDropdown");
  const dropdownOptions = document.getElementById("placeDropdownOptions");

  const dropdownText = customDropdown.querySelector("span");

  dropdownText.classList.add("text-muted");

  customDropdown.addEventListener("click", function () {
    customDropdown.classList.toggle("open");
    dropdownOptions.classList.toggle("open");
  });

  const options = dropdownOptions.querySelectorAll(".dropdown-option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedValue = this.textContent;

      dropdownText.textContent = selectedValue;

      dropdownText.classList.remove("text-muted");

      customDropdown.classList.remove("open");
      dropdownOptions.classList.remove("open");
    });
  });

  document.addEventListener("click", function (e) {
    if (!customDropdown.contains(e.target)) {
      customDropdown.classList.remove("open");
      dropdownOptions.classList.remove("open");
    }
  });
});

// Custom dropdown
document.addEventListener("DOMContentLoaded", function () {
  // Обработчик кликов для всех выпадающих списков
  document.querySelectorAll(".custom-dropdown").forEach((customDropdown) => {
    const dropdownOptions = customDropdown.nextElementSibling; // Соседний блок с опциями
    const dropdownArrow = customDropdown.querySelector(".dropdown-arrow");

    // Открытие/закрытие dropdown при клике
    customDropdown.addEventListener("click", function (event) {
      event.stopPropagation(); // Останавливаем всплытие, чтобы не закрыть список
      const isOpen = dropdownOptions.classList.contains("open");
      dropdownOptions.classList.toggle("open", !isOpen); // Переключаем состояние
      dropdownArrow.classList.toggle("open", !isOpen); // Переключаем поворот стрелки
    });

    // Обработчик клика по опциям dropdown
    const options = dropdownOptions.querySelectorAll(".dropdown-option");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        const selectedValue = this.textContent;
        customDropdown.querySelector("span").textContent = selectedValue;
        dropdownOptions.classList.remove("open");
        dropdownArrow.classList.remove("open");
      });
    });
  });

  // Закрытие всех dropdown при клике вне
  document.addEventListener("click", function (e) {
    // Проверяем, если клик был вне всех custom-dropdown
    document.querySelectorAll(".custom-dropdown").forEach((customDropdown) => {
      const dropdownOptions = customDropdown.nextElementSibling; // Соседний блок с опциями
      const dropdownArrow = customDropdown.querySelector(".dropdown-arrow");
      if (!customDropdown.contains(e.target)) {
        dropdownOptions.classList.remove("open");
        dropdownArrow.classList.remove("open");
      }
    });
  });
});
