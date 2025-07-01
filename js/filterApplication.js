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

  const sendApplicationBtnWaiting = document.getElementById(
    "sendApplicationBtnWaiting"
  );
  if (sendApplicationBtnWaiting) {
    sendApplicationBtnWaiting.addEventListener("click", () => {
      showToast();

      const modalWaiting = bootstrap.Modal.getInstance(
        document.getElementById("modalTabWaiting")
      );
      if (modalWaiting) {
        modalWaiting.hide();
      }
    });
  }

  const sendApplicationBtnSent = document.getElementById(
    "sendApplicationBtnSent"
  );
  if (sendApplicationBtnSent) {
    sendApplicationBtnSent.addEventListener("click", () => {
      showToast();

      const modalSent = bootstrap.Modal.getInstance(
        document.getElementById("modalTabSent")
      );
      if (modalSent) {
        modalSent.hide();
      }
    });
  }

  const openModalForStatus = (status) => {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById(
        `modalTab${status.charAt(0).toUpperCase() + status.slice(1)}`
      )
    );
    if (modal) {
      modal.show();
    }
  };

  document
    .querySelectorAll(".notification-box.send")
    .forEach((notification) => {
      notification.addEventListener("click", () => {
        openModalForStatus("send");
      });
    });

  document
    .querySelectorAll(".notification-box.waiting")
    .forEach((notification) => {
      notification.addEventListener("click", () => {
        openModalForStatus("waiting");
      });
    });

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
