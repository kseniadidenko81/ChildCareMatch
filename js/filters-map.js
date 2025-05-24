// Auto height all content
function updateContainerHeight() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1280) {
    const headerHeight = 84.9062;
    document.getElementById(
      "content-container"
    ).style.height = `calc(100vh - ${headerHeight}px)`;
    document.body.style.overflow = "hidden";
  } else {
    document.getElementById("content-container").style.height = "auto";
    document.body.style.overflow = "auto";
  }
}

window.addEventListener("load", updateContainerHeight);
window.addEventListener("resize", updateContainerHeight);

// Modal Waiting
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script Loaded!");

  const buttons = document.querySelectorAll(
    ".btn-modal-waiting, .btn-modal-sent"
  );
  console.log("Buttons found:", buttons.length);

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Button clicked!");

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

  document.querySelectorAll(".subtotal-btn").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const message = button.getAttribute("data-message");
      showToast(message);
    });
  });

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      clearFilters();
      showToast("Your data has been cleared");
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

// SHOW CHILD CHECKBOX
function toggleTab() {
  const checkboxes = document.querySelectorAll(".child-checkbox");
  const tabChildren = document.querySelectorAll(".tab-child");
  const noSelectionMessage = document.getElementById("noSelectionMessage");

  let anyChecked = false;

  tabChildren.forEach((tab) => (tab.style.display = "none"));

  checkboxes.forEach((checkbox) => {
    const tab = document.getElementById(`${checkbox.id}-tab`);
    if (checkbox.checked) {
      anyChecked = true;
      if (tab) tab.style.display = "block";
    }
  });

  noSelectionMessage.style.display = anyChecked ? "none" : "block";
}

window.addEventListener("DOMContentLoaded", toggleTab);

// BADGE TOOLTIP
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach(function (el) {
    new bootstrap.Tooltip(el, {
      customClass: "custom-tooltip",
      animation: true,
      delay: { show: 100, hide: 100 },
    });
  });
});

// MODAL DROPDOWN
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

// SCROLL TAB
function updatePadding(container) {
  if (container.scrollHeight > container.clientHeight) {
    container.style.paddingRight = "10px";
  } else {
    container.style.paddingRight = "0";
  }
}

window.addEventListener("load", function () {
  document
    .querySelectorAll(".scrollable-content")
    .forEach(function (container) {
      updatePadding(container);
    });
});

document.querySelectorAll(".tab-links a").forEach(function (tab) {
  tab.addEventListener("click", function (event) {
    event.preventDefault();

    document.querySelectorAll(".tab-pane").forEach(function (pane) {
      pane.classList.remove("active");
    });

    var target = document.querySelector(tab.getAttribute("href"));
    target.classList.add("active");

    setTimeout(function () {
      updatePadding(target);
    }, 0);
  });
});

// SEARCH MODAL RECOMMENDED
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");

function showAllMarkers() {
  if (typeof markers !== "undefined") {
    markers.forEach(({ marker }) => {
      marker.setVisible(true);
    });
  }
}

function filterMarkers(query) {
  const lowerQuery = query.trim().toLowerCase();
  if (!lowerQuery) {
    showAllMarkers();
    return;
  }

  if (typeof markers !== "undefined") {
    markers.forEach(({ marker, name }) => {
      const match = name.toLowerCase().includes(lowerQuery);
      marker.setVisible(match);
    });
  }
}

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    searchIcon.classList.remove("bi-x-lg");
    searchIcon.classList.add("bi-search");
    showAllMarkers();
  }
});

searchIcon.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (searchIcon.classList.contains("bi-x-lg")) {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
    showAllMarkers();
  } else {
    if (query !== "") {
      filterMarkers(query);
      searchIcon.classList.remove("bi-search");
      searchIcon.classList.add("bi-x-lg");
    }
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (query !== "") {
      filterMarkers(query);
      searchIcon.classList.remove("bi-search");
      searchIcon.classList.add("bi-x-lg");
    }
  }
});

// MAPS and SEARCH
var map;
var infowindow;
var markers = [];

var locations = [
  [
    "<h6>Bright Future Academy</h6><p>Bismarck, ND 58501</p><span><strong>Phone:</strong> 701-555-1234</span><span class='d-block pt-2'> 0.6 miles </span><span class='d-block pt-2'><strong>Estimated: </strong><span><i class='bi bi-person-walking me-1'></i>13 min, </span><span><i class='bi bi-car-front me-1'></i>5 min</span></span><span class='d-block pt-2'>",
    46.8133,
    -100.779,
    4,
  ],
  [
    "<h6>Sunny Days Kindergarten</h6><p>Fargo, ND 58103</p><span><strong>Phone:</strong> 701-555-4321</span><span class='d-block pt-2'> 0.6 miles </span><span class='d-block pt-2'><strong>Estimated: </strong><span><i class='bi bi-person-walking me-1'></i>13 min, </span><span><i class='bi bi-car-front me-1'></i>5 min</span></span><span class='d-block pt-2'>",
    46.8772,
    -96.7894,
    5,
  ],
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: new google.maps.LatLng(47.47021625, -100.47173475),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  infowindow = new google.maps.InfoWindow();

  for (let i = 0; i < locations.length; i++) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      title: "Click for more info",
    });

    markers.push({ marker: marker, name: locations[i][0] });

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          if (infowindow.marker != marker) {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
            infowindow.marker = marker;
          }
        };
      })(marker, i)
    );
  }
}
window.onload = initMap;
