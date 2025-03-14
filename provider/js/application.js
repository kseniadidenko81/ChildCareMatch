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

  const newApplicationBtnWaiting = document.getElementById(
    "newApplicationBtnWaiting"
  );
  if (newApplicationBtnWaiting) {
    newApplicationBtnWaiting.addEventListener("click", () => {
      showToast();

      const modalWaiting = bootstrap.Modal.getInstance(
        document.getElementById("modalTabWaiting")
      );
      if (modalWaiting) {
        modalWaiting.hide();
      }
    });
  }

  const newApplicationBtnNew = document.getElementById("newApplicationBtnNew");
  if (newApplicationBtnNew) {
    newApplicationBtnNew.addEventListener("click", () => {
      showToast();

      const modalNew = bootstrap.Modal.getInstance(
        document.getElementById("modalTabNew")
      );
      if (modalNew) {
        modalNew.hide();
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

  document.querySelectorAll(".notification-box.new").forEach((notification) => {
    notification.addEventListener("click", () => {
      openModalForStatus("new");
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

  document.querySelector(".btn-filter-tab[data-status='new']").click();

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
