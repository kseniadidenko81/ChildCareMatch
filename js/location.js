// LOCATION
document.addEventListener("DOMContentLoaded", function () {
  const placeDropdown = document.getElementById("placeDropdown");
  const placeDropdownOptions = document.getElementById("placeDropdownOptions");
  let dropdownArrow = placeDropdown.querySelector(".dropdown-arrow i");

  const streetLocation = document.getElementById("streetLocation");
  const streetSuggestions = document.getElementById("streetSuggestions");
  const cityLocation = document.getElementById("cityLocation");
  const stateLocation = document.getElementById("stateLocation");
  const zipLocation = document.getElementById("zipLocation");
  const addLocationBtn = document.getElementById("addLocationBtn");
  const locationsContainer = document.getElementById("locationsContainer");

  const streetData = [
    { name: "Main St", city: "New York", state: "NY", zip: "10001" },
    { name: "Elm St", city: "Los Angeles", state: "CA", zip: "90001" },
    { name: "Oak St", city: "Chicago", state: "IL", zip: "60601" },
    { name: "Pine St", city: "San Francisco", state: "CA", zip: "94101" },
  ];

  let currentCard = null;
  let currentLocationData = {};

  function updateDropdownArrow() {
    dropdownArrow = placeDropdown.querySelector(".dropdown-arrow i");
  }

  placeDropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    placeDropdownOptions.classList.toggle("show");
    updateDropdownArrow();
    if (dropdownArrow) {
      dropdownArrow.classList.toggle("rotate");
    }
  });

  placeDropdownOptions
    .querySelectorAll(".dropdown-option")
    .forEach((option) => {
      option.addEventListener("click", function () {
        const icon = this.querySelector("i").outerHTML;
        const text = this.textContent.trim();
        placeDropdown.innerHTML = `${icon} ${text} <span class="dropdown-arrow"><i class="bi bi-chevron-down"></i></span>`;
        placeDropdownOptions.classList.remove("show");
        updateDropdownArrow();
        if (dropdownArrow) {
          dropdownArrow.classList.remove("rotate");
        }
      });
    });

  document.addEventListener("click", function (event) {
    if (!placeDropdown.contains(event.target)) {
      placeDropdownOptions.classList.remove("show");
      updateDropdownArrow();
      if (dropdownArrow) {
        dropdownArrow.classList.remove("rotate");
      }
    }
  });

  function addLocationCard(title, text) {
    const locationCard = document.createElement("div");
    locationCard.classList.add(
      "location-card",
      "card",
      "mb-3",
      "col-md-10",
      "col-lg-8",
      "m-auto"
    );
    locationCard.innerHTML = ` 
    <div class="card-body d-flex gap-2 justify-content-between align-items-center">
      <div>
        <h5 class="card-title">${title}</h5>
        <p class="small text-muted card-text">${text}</p>
      </div>
      <div class="d-flex">
        <i class="bi bi-pencil text-primary edit-location me-2" style="cursor: pointer;"></i>
        <i class="bi bi-trash text-danger remove-location" style="cursor: pointer;"></i>
      </div>
    </div>`;

    locationCard
      .querySelector(".remove-location")
      .addEventListener("click", function () {
        locationCard.remove();
      });

    locationCard
      .querySelector(".edit-location")
      .addEventListener("click", function () {
        currentCard = locationCard;

        const currentTitle =
          locationCard.querySelector(".card-title").innerHTML;
        const currentText =
          locationCard.querySelector(".card-text").textContent;

        const [street, city, state, zip] = currentText.split(", ");

        currentLocationData = {
          title: currentTitle,
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          zip: zip.trim(),
        };

        $("#modalAddLocation").modal("show");

        fillModalFields(currentLocationData);

        document.getElementById(
          "addLocationBtn"
        ).innerHTML = `<i class="fa fa-save me-2"></i>Save Location`;
      });

    locationsContainer.appendChild(locationCard);
  }

  function fillModalFields(data) {
    placeDropdown.innerHTML = data.title;
    streetLocation.value = data.street;
    cityLocation.value = data.city;
    stateLocation.value = data.state;
    zipLocation.value = data.zip;
  }

  streetLocation.addEventListener("input", function () {
    const query = streetLocation.value.toLowerCase();
    streetSuggestions.innerHTML = "";

    if (query.length > 0) {
      const filteredStreets = streetData.filter((street) =>
        street.name.toLowerCase().includes(query)
      );

      if (filteredStreets.length > 0) {
        streetSuggestions.style.display = "block";
        filteredStreets.forEach((street) => {
          const suggestionItem = document.createElement("li");
          suggestionItem.classList.add("list-group-item");
          suggestionItem.textContent = street.name;
          suggestionItem.addEventListener("click", function () {
            streetLocation.value = street.name;
            cityLocation.value = street.city;
            stateLocation.value = street.state;
            zipLocation.value = street.zip;
            streetSuggestions.style.display = "none";
          });
          streetSuggestions.appendChild(suggestionItem);
        });
      } else {
        streetSuggestions.style.display = "none";
      }
    } else {
      streetSuggestions.style.display = "none";
    }
  });

  $("#modalAddLocation").on("show.bs.modal", function () {
    streetLocation.value = "";
    cityLocation.value = "";
    stateLocation.value = "";
    zipLocation.value = "";
    streetSuggestions.innerHTML = "";

    placeDropdown.innerHTML = ` 
      <span class="text-muted">Select value</span>
      <span class="dropdown-arrow"><i class="bi bi-chevron-down"></i></span>
    `;

    updateDropdownArrow();

    document.getElementById(
      "addLocationBtn"
    ).innerHTML = `<i class="bi bi-plus-circle me-2"></i>Add Location`;
  });

  addLocationBtn.addEventListener("click", function () {
    const place = placeDropdown.innerHTML.trim();
    const street = streetLocation.value.trim();
    const city = cityLocation.value.trim();
    const state = stateLocation.value.trim();
    const zip = zipLocation.value.trim();

    const iconAndText = place
      .replace(/<span class="dropdown-arrow">.*<\/span>/, "")
      .trim();
    const locationText = `${street}, ${city}, ${state}, ${zip}`;

    if (iconAndText && street && city && state && zip) {
      if (currentCard) {
        currentCard.querySelector(".card-title").innerHTML = iconAndText;
        currentCard.querySelector(".card-text").textContent = locationText;
        $("#modalAddLocation").modal("hide");
        currentCard = null;
      } else {
        addLocationCard(iconAndText, locationText);
      }
    }
  });

  const css = `
    .rotate {
      transform: rotate(180deg);
      transition: transform 0.3s ease;
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
});
