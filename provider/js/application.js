document.addEventListener("DOMContentLoaded", () => {
  const toastMessage = document.getElementById("toastMessage");

  const showToast = () => {
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

  // document.querySelectorAll(".edit-btn").forEach((btn) => {
  //   btn.addEventListener("click", () => {
  //     showToast();
  //   });
  // });

  const filterTabs = document.querySelectorAll(".btn-filter-tab");
  const statusContainers = document.querySelectorAll(".status-container");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const status = tab.getAttribute("data-status");

      statusContainers.forEach((container) => {
        container.style.display = "none";
      });

      document
        .querySelectorAll(`.status-container.${status}`)
        .forEach((container) => {
          container.style.display = "block";
        });
    });
  });

  document.querySelector(".btn-filter-tab[data-status='send']").click();
});

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
      dropdown.innerHTML = `
        ${option.innerHTML} 
        <span class="dropdown-arrow"><i class="bi bi-chevron-down"></i></span>`;
      dropdownOptions.classList.remove("show");
      arrow.classList.remove("rotate");
    });
  });

  document.addEventListener("click", () => {
    dropdownOptions.classList.remove("show");
    arrow.classList.remove("rotate");
  });
});

// Age Display
function calculateAgeDetailed(dateString) {
  const birthDate = new Date(dateString);
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) months--;
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

document.addEventListener("DOMContentLoaded", () => {
  const ageElements = document.querySelectorAll(".age-display");

  ageElements.forEach((el) => {
    const birthdate = el.dataset.birthdate;
    if (!birthdate) return;

    const { years, months } = calculateAgeDetailed(birthdate);
    const ageText = `${years}yr${years !== 1 ? "s" : ""} ${months}mo`;

    const ageContainer = el.querySelector(".mt-1");
    if (ageContainer) {
      ageContainer.textContent = `(${ageText})`;
    }
  });
});

// Add avatar
document.querySelectorAll(".avatar-preview").forEach((img) => {
  img.addEventListener("click", () => {
    const wrapper = img.closest(".avatar-wrapper");
    const input = wrapper.querySelector(".avatar-upload");
    input.click();
  });
});

document.querySelectorAll(".avatar-upload").forEach((input) => {
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const wrapper = input.closest(".avatar-wrapper");
      const preview = wrapper.querySelector(".avatar-preview");
      preview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
});

// Buttons card
document.addEventListener("DOMContentLoaded", () => {
  const statusMap = {
    Approve: "approved",
    Reject: "rejected",
    "Send to Waiting list": "waiting",
  };

  document.addEventListener("click", function (e) {
    const button = e.target.closest(".edit-btn");
    if (!button) return;

    const card = button.closest(".notification-box");
    if (!card) return;

    const allButtons = card.querySelectorAll(".edit-btn");
    allButtons.forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline-primary");
    });

    button.classList.remove("btn-outline-primary");
    button.classList.add("btn-primary", "text-white");

    const action = button.textContent.trim();
    const newStatus = statusMap[action];
    if (!newStatus) return;

    card.classList.remove(
      "send-approved",
      "send-rejected",
      "send-waiting",
      "send"
    );

    card.classList.add(`send-${newStatus}`, "send");

    const targetContainer = document.querySelector(
      `.status-container.${newStatus}`
    );
    if (targetContainer && !targetContainer.contains(card)) {
      targetContainer.appendChild(card);
    }
  });
});
