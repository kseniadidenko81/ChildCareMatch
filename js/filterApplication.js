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

  const viewDetailsButtons = document.querySelectorAll(".edit-btn");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectedCard = this.closest(".notification-box");
    });
  });

  const sendApplicationBtn = document.getElementById("sendApplicationBtn");
  sendApplicationBtn.addEventListener("click", function () {
    if (selectedCard && selectedCard.classList.contains("send")) {
      const targetStatus = "approved";

      selectedCard.classList.remove("send");
      selectedCard.classList.add(targetStatus);

      updateTabVisibility();

      modalTabsSend.hide();
    }
  });

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

  const tabButtons = document.querySelectorAll(".btn-filter-tab");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      updateTabVisibility();
    });
  });

  updateTabVisibility();
});
