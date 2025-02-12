// FILTER NOTIFICATION

const searchInput = document.getElementById("searchInput");
const notifications = document.querySelectorAll(".notification-box");
const resetFiltersButton = document.getElementById("resetFilters");
const searchIcon = document.querySelector(".input-group-text i");

let currentStatusFilter = "all";

document.querySelectorAll(".btn-filter-tab").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".btn-filter-tab")
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    currentStatusFilter = this.getAttribute("data-status");
    filterNotifications();
  });
});

if (resetFiltersButton) {
  resetFiltersButton.addEventListener("click", function () {
    currentStatusFilter = "all";
    document
      .querySelectorAll(".btn-filter-tab")
      .forEach((btn) => btn.classList.remove("active"));
    searchInput.value = "";
    updateSearchIcon();
    filterNotifications();
  });
}

function filterNotifications() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  console.log("Search Query:", searchQuery);

  notifications.forEach((notification) => {
    const titleElement = notification.querySelector(".notification-title");
    if (!titleElement) {
      console.log("No title element found for:", notification);
      return;
    }
    const titleText = titleElement.innerText.toLowerCase().trim();
    console.log("Title Found:", titleText);

    const searchWords = searchQuery
      .split(" ")
      .filter((word) => word.length > 0);
    const matchesSearch = searchWords.every((word) => titleText.includes(word));

    const matchesStatus =
      currentStatusFilter === "all" ||
      notification.classList.contains(currentStatusFilter);

    console.log(
      `Notification: ${titleText}, Matches Search: ${matchesSearch}, Matches Status: ${matchesStatus}`
    );

    if (matchesSearch && matchesStatus) {
      notification.style.display = "block";
    } else {
      notification.style.display = "none";
    }
  });
}

function updateSearchIcon() {
  if (searchInput.value) {
    searchIcon.classList.remove("bi-search");
    searchIcon.classList.add("bi-x");
  } else {
    searchIcon.classList.remove("bi-x");
    searchIcon.classList.add("bi-search");
  }
}

searchInput.addEventListener("input", () => {
  filterNotifications();
  updateSearchIcon();
});

if (searchIcon && searchIcon.parentElement) {
  searchIcon.parentElement.addEventListener("click", () => {
    if (searchInput.value) {
      searchInput.value = "";
      updateSearchIcon();
      filterNotifications();
    }
  });
}
// Временно. Пока не появится функционал на иконку в углу - отправить
// Remove all event listeners on the dismiss-btn button
document.querySelectorAll(".dismiss-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    // Block any actions
    event.stopImmediatePropagation(); // Stop any events in the chain
    event.preventDefault(); // Prevent default behavior
  });
});

// Ensure all notifications are visible
document.querySelectorAll(".notification-box").forEach((notification) => {
  notification.style.display = "block"; // Make sure notifications are visible
});
