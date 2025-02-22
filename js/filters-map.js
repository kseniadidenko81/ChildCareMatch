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

  const subtotalLink = document.querySelector(".subtotal-btn");
  if (subtotalLink) {
    subtotalLink.addEventListener("click", function (e) {
      e.preventDefault();
      const message = subtotalLink.getAttribute("data-message");
      showToast(message);
    });
  }

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      clearFilters();
      localStorage.setItem("filtersCleared", "true");
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

// Count Child

// FROM/TO
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

// WEEKDAYS
document.addEventListener("DOMContentLoaded", function () {
  const weekdays = document.querySelectorAll(".weekday");

  weekdays.forEach((weekday) => {
    weekday.addEventListener("click", function () {
      weekday.classList.toggle("selected");
    });
  });
});

// STARS FILL
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  const ratingValue = document.querySelector(".rating-value");
  let selectedRating = 0;

  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      if (selectedRating === 0) {
        highlightStars(this.getAttribute("data-value"));
      }
    });

    star.addEventListener("mouseout", function () {
      if (selectedRating === 0) {
        highlightStars(0);
      }
    });

    star.addEventListener("click", function () {
      selectedRating = parseInt(this.getAttribute("data-value"), 10);
      highlightStars(selectedRating);
    });
  });

  function highlightStars(value) {
    stars.forEach((star) => {
      let starValue = parseInt(star.getAttribute("data-value"), 10);
      star.classList.toggle("filled", starValue <= value);
    });
    ratingValue.textContent = value > 0 ? value.toFixed(1) : "0.0";
  }
});

// FILTERS MAP

const toggleChildrenList = () => {
  const childrenList = document.getElementById("childrenList");
  if (
    childrenList.style.display === "none" ||
    childrenList.style.display === ""
  ) {
    childrenList.style.display = "block";
  } else {
    childrenList.style.display = "none";
  }
};

document
  .getElementById("toggleChildrenListBtn")
  .addEventListener("click", toggleChildrenList);

function switchTab(tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabTitles = document.querySelectorAll(".tab-title");

  tabContents.forEach((tab) => tab.classList.remove("active"));
  tabTitles.forEach((title) => title.classList.remove("active"));

  document.getElementById(tabName + "-tab").classList.add("active");
  const activeTabTitle = Array.from(tabTitles).find(
    (title) => title.innerText.toLowerCase() === tabName
  );
  if (activeTabTitle) activeTabTitle.classList.add("active");
}

function toggleTab() {
  const childTabs = document.querySelectorAll(".tab-child");
  childTabs.forEach((tab) => (tab.style.display = "none"));

  const selectedChildren = document.querySelectorAll(
    ".children-checkboxes input:checked"
  );

  selectedChildren.forEach((checkbox) => {
    const childId = checkbox.id;
    const tab = document.getElementById(childId + "-tab");
    if (tab) {
      tab.style.display = "block";
    }
  });
}

document.querySelectorAll(".children-checkboxes input").forEach((checkbox) => {
  checkbox.addEventListener("change", toggleTab);
});

window.addEventListener("load", () => {
  const firstChildCheckbox = document.getElementById("child1");
  if (firstChildCheckbox) {
    firstChildCheckbox.checked = true;
    toggleTab();
  }
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

// RESET BUTTON
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("filtersCleared") === "true") {
    clearFilters();
  }

  document.getElementById("resetButton").addEventListener("click", function () {
    clearFilters();
    localStorage.setItem("filtersCleared", "true");
  });
});

function clearFilters() {
  document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
    checkbox.checked = false;
  });

  document.querySelectorAll(".timeInput").forEach((timeInput) => {
    timeInput.value = "";
  });

  document.querySelectorAll(".ampm-display").forEach((ampmInput) => {
    ampmInput.value = "";
    ampmInput.classList.add("d-none");
  });

  document.querySelectorAll(".weekday").forEach((day) => {
    day.classList.remove("selected");
  });

  document.querySelectorAll(".star").forEach((star) => {
    star.classList.remove("fa-star", "filled");
    star.classList.add("fa-star-o");
    star.style.color = "";
  });

  document.querySelector(".rating-value").textContent = "0.0";

  document.querySelector(".rating").setAttribute("data-rating", "0");
}

// SEARCH
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const allCards = document.querySelectorAll("#list-tab .card");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    allCards.forEach((card) => {
      const cardText = card.textContent.toLowerCase();

      if (cardText.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  const searchIcon = document.getElementById("searchIcon");
  searchIcon.addEventListener("click", function () {
    searchInput.focus();
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

// MAPS
var map;
var infowindow;
var markers = [];

var locations = [
  [
    "<h6>Bright Future Academy</h6><p>Bismarck, ND 58501</p><span><strong>Phone:</strong> 701-555-1234</span>",
    46.8133,
    -100.779,
    4,
  ],
  [
    "<h6>Sunny Days Kindergarten</h6><p>Fargo, ND 58103</p><span><strong>Phone:</strong> 701-555-4321</span>",
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

  var marker;
  for (var i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      title: "Click for more info",
    });

    markers.push(marker);

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

    google.maps.event.addListener(marker, "mouseover", function () {
      infowindow.setContent("Hovering over marker: " + locations[i][0]);
      infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, "mouseout", function () {
      //infowindow.close();
    });
  }

  document.getElementById("geoIcon").addEventListener("click", function () {
    var selectedMarker = markers[0];
    infowindow.setContent("Selected location: " + locations[0][0]);
    infowindow.open(map, selectedMarker);
    map.setCenter(selectedMarker.getPosition());
    map.setZoom(10);
  });
}

window.onload = initMap;
