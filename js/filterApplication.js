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
});
