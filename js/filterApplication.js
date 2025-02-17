// DROPDOWN FORM
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".custom-dropdown");

  dropdowns.forEach((dropdown, index) => {
    const dropdownOptions = document.getElementById(
      `dropdownOptions${index + 1}`
    );
    const dropdownArrow = document.getElementById(`dropdownArrow${index + 1}`);
    const options = dropdownOptions.querySelectorAll(".dropdown-option");

    dropdown.addEventListener("click", function () {
      dropdownOptions.classList.toggle("active");

      if (dropdownOptions.classList.contains("active")) {
        dropdownArrow.innerHTML = '<i class="bi bi-chevron-up"></i>';
      } else {
        dropdownArrow.innerHTML = '<i class="bi bi-chevron-down"></i>';
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const text = this.textContent;

        dropdown.textContent = text;
        dropdown.appendChild(dropdownArrow);

        dropdownOptions.classList.remove("active");
        dropdownArrow.innerHTML = '<i class="bi bi-chevron-down"></i>';
      });
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdownOptions.classList.remove("active");
        dropdownArrow.innerHTML = '<i class="bi bi-chevron-down"></i>';
      }
    });
  });
});

// MOVE CARD TO TAB
document.addEventListener("DOMContentLoaded", function () {
  let selectedCard = null;
  const modalTabsSend = new bootstrap.Modal(
    document.getElementById("modalTabSend")
  );
  const modalTabApproved = new bootstrap.Modal(
    document.getElementById("modalTabApproved")
  );
  const modalTabWaiting = new bootstrap.Modal(
    document.getElementById("modalTabWaiting")
  );
  const modalTabRejected = new bootstrap.Modal(
    document.getElementById("modalTabRejected")
  );
  const toastElement = document.getElementById("toastMessage");
  const toast = new bootstrap.Toast(toastElement);

  let hasOpenedSendModal = false;

  const viewDetailsButtons = document.querySelectorAll(".edit-btn");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectedCard = this.closest(".notification-box");
      showCorrectModal(selectedCard);
    });
  });

  const sendApplicationBtn = document.getElementById("sendApplicationBtn");

  sendApplicationBtn.addEventListener("click", function () {
    if (selectedCard && selectedCard.classList.contains("send")) {
      let targetStatus = null;

      if (selectedCard.classList.contains("send-approved")) {
        targetStatus = "approved";
      }
      if (selectedCard.classList.contains("send-waiting")) {
        targetStatus = "waiting";
      }
      if (selectedCard.classList.contains("send-rejected")) {
        targetStatus = "rejected";
      }

      if (targetStatus) {
        decreaseCount("send");
        moveCardToNewStatus(targetStatus);
      }

      hideModal(modalTabsSend);
      showToast();
    }
  });

  function moveCardToNewStatus(targetStatus) {
    if (selectedCard) {
      const currentTab = selectedCard.closest(".status-container");
      if (currentTab && currentTab.classList.contains("send-tab")) {
        currentTab.removeChild(selectedCard);
      }

      const targetTab = document.querySelector(
        `.status-container.${targetStatus}-tab`
      );
      if (targetTab) {
        selectedCard.classList.remove(
          "send",
          "approved",
          "waiting",
          "rejected",
          "send-approved",
          "send-waiting",
          "send-rejected"
        );
        selectedCard.classList.add(targetStatus);

        targetTab.appendChild(selectedCard);
        selectedCard.style.display = "block";
      }

      updateTabVisibility();
      updateCount(targetStatus);
    }

    hideModal(modalTabsSend);
    hideModal(modalTabApproved);
    hideModal(modalTabWaiting);
    hideModal(modalTabRejected);
  }

  function hideModal(modal) {
    const modalElement = modal._element;
    modal.hide();
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    modalElement.setAttribute("aria-hidden", "true");
    modalElement.setAttribute("aria-modal", "false");
    modalElement.removeAttribute("style");
  }

  function updateTabVisibility() {
    const activeTab = document.querySelector(".btn-filter-tab.active");
    const status = activeTab ? activeTab.getAttribute("data-status") : "send";

    const notificationBoxes = document.querySelectorAll(".notification-box");
    notificationBoxes.forEach((box) => {
      if (box.classList.contains(status)) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });
  }

  function updateCount(status) {
    const statusButton = document.querySelector(
      `.btn-filter-tab[data-status="${status}"]`
    );
    const countElement = statusButton.querySelector(".count");

    if (countElement) {
      let currentCount = parseInt(countElement.innerText);
      countElement.innerText = currentCount + 1;
    }
  }

  function decreaseCount(status) {
    const statusButton = document.querySelector(
      `.btn-filter-tab[data-status="${status}"]`
    );
    const countElement = statusButton.querySelector(".count");

    if (countElement) {
      let currentCount = parseInt(countElement.innerText);
      if (currentCount > 0) {
        countElement.innerText = currentCount - 1;
      }

      if (currentCount === 1) {
        countElement.innerText = 0;
      }
    }
  }

  function showToast() {
    toastElement.classList.remove("show");

    setTimeout(() => {
      toastElement.classList.add("show");
    }, 600);

    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 4000);
  }

  function showCorrectModal(card) {
    hideModal(modalTabsSend);
    hideModal(modalTabApproved);
    hideModal(modalTabWaiting);
    hideModal(modalTabRejected);

    let targetStatus = null;

    if (card.classList.contains("approved")) {
      targetStatus = "approved";
    }
    if (card.classList.contains("waiting")) {
      targetStatus = "waiting";
    }
    if (card.classList.contains("rejected")) {
      targetStatus = "rejected";
    }

    if (targetStatus === "approved") {
      modalTabApproved.show();
    } else if (targetStatus === "waiting") {
      modalTabWaiting.show();
    } else if (targetStatus === "rejected") {
      modalTabRejected.show();
    }

    if (
      !hasOpenedSendModal &&
      card.closest(".status-container").classList.contains("send-tab")
    ) {
      modalTabsSend.show();
      hasOpenedSendModal = true;
    }
  }

  const tabButtons = document.querySelectorAll(".btn-filter-tab");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      updateTabVisibility();
    });
  });

  updateTabVisibility();

  const closeButtons = document.querySelectorAll(".btn-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      hideModal(modalTabsSend);
      hasOpenedSendModal = false;
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cardToDelete = this.closest(".notification-box");
      const status = cardToDelete.classList.contains("approved")
        ? "approved"
        : cardToDelete.classList.contains("waiting")
        ? "waiting"
        : cardToDelete.classList.contains("rejected")
        ? "rejected"
        : "send";

      cardToDelete.remove();

      decreaseCount(status);
      updateTabVisibility();
    });
  });
});
