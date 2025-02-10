// FILTER NOTIFICATION

const filterButtons = document.querySelectorAll(".btn-filter-tab");
const typeButtons = document.querySelectorAll(".btn-type-filter");
const searchInput = document.getElementById("searchInput");
const notifications = document.querySelectorAll(".notification-box");

let currentStatusFilter = "all";
let currentTypeFilter = "all";

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    currentStatusFilter = this.getAttribute("data-status");
    filterNotifications();
  });
});

typeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    typeButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    currentTypeFilter = this.getAttribute("data-type");
    filterNotifications();
  });
});

searchInput.addEventListener("input", filterNotifications);

function filterNotifications() {
  const searchQuery = searchInput.value.toLowerCase();
  notifications.forEach((notification) => {
    const matchesSearch = notification.textContent
      .toLowerCase()
      .includes(searchQuery);
    const matchesStatus =
      currentStatusFilter === "all" ||
      notification.classList.contains(currentStatusFilter);
    const matchesType =
      currentTypeFilter === "all" ||
      notification.classList.contains(currentTypeFilter);

    if (matchesSearch && matchesStatus && matchesType) {
      notification.style.display = "block";
    } else {
      notification.style.display = "none";
    }
  });
}
