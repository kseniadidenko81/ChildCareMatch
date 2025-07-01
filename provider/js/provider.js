// MODAL WAITING
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".btn-modal-waiting, .btn-modal-sent"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
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

// TOAST MESSAGE
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
});

// ICON HEART
document.addEventListener("DOMContentLoaded", function () {
  const heartIcons = document.querySelectorAll(".heart-icon");

  heartIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      icon.classList.toggle("active");
    });
  });
});

// TIME
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

// DROPDOWN EMAIL
document.addEventListener("DOMContentLoaded", function () {
  const customDropdown = document.getElementById("placeDropdown");
  const dropdownOptions = document.getElementById("placeDropdownOptions");

  const dropdownText = customDropdown.querySelector("span");

  dropdownText.classList.add("text-muted");

  customDropdown.addEventListener("click", function () {
    customDropdown.classList.toggle("open");
    dropdownOptions.classList.toggle("open");
  });

  const options = dropdownOptions.querySelectorAll(".dropdown-option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedValue = this.textContent;

      dropdownText.textContent = selectedValue;

      dropdownText.classList.remove("text-muted");

      customDropdown.classList.remove("open");
      dropdownOptions.classList.remove("open");
    });
  });

  document.addEventListener("click", function (e) {
    if (!customDropdown.contains(e.target)) {
      customDropdown.classList.remove("open");
      dropdownOptions.classList.remove("open");
    }
  });
});

// CUSTOM DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".custom-dropdown").forEach((customDropdown) => {
    const dropdownOptions = customDropdown.nextElementSibling;
    const dropdownArrow = customDropdown.querySelector(".dropdown-arrow");

    customDropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      const isOpen = dropdownOptions.classList.contains("open");
      dropdownOptions.classList.toggle("open", !isOpen);
      dropdownArrow.classList.toggle("open", !isOpen);
    });

    const options = dropdownOptions.querySelectorAll(".dropdown-option");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        const selectedValue = this.textContent;
        customDropdown.querySelector("span").textContent = selectedValue;
        dropdownOptions.classList.remove("open");
        dropdownArrow.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", function (e) {
    document.querySelectorAll(".custom-dropdown").forEach((customDropdown) => {
      const dropdownOptions = customDropdown.nextElementSibling;
      const dropdownArrow = customDropdown.querySelector(".dropdown-arrow");
      if (!customDropdown.contains(e.target)) {
        dropdownOptions.classList.remove("open");
        dropdownArrow.classList.remove("open");
      }
    });
  });
});

// REVIEW
document.addEventListener("DOMContentLoaded", () => {
  let currentRating = 0;
  let editingReviewCard = null;

  function formatDate(date) {
    const options = { month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} at ${time}`;
  }

  function renderStars(rating, containerId, showRatingText = false) {
    const starsContainer = document.getElementById(containerId);
    if (!starsContainer) return;

    rating = isNaN(rating) ? 0 : rating;
    starsContainer.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.classList.add("fa", rating >= i ? "fa-star" : "fa-star-o");
      star.dataset.value = i;
      starsContainer.appendChild(star);
    }

    if (showRatingText) {
      let ratingText = document.createElement("span");
      ratingText.className = "rating-text ms-2 fw-bold";
      ratingText.textContent = `(${rating})`;
      starsContainer.appendChild(ratingText);
    }
  }

  document.getElementById("rating-modal").addEventListener("mousemove", (e) => {
    if (e.target.tagName === "SPAN") {
      renderStars(parseInt(e.target.dataset.value), "rating-modal", true);
    }
  });

  document.getElementById("rating-modal").addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      currentRating = parseInt(e.target.dataset.value);
      renderStars(currentRating, "rating-modal", true);
    }
  });

  document
    .getElementById("reviewForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const reviewTitle = document.getElementById("reviewTitle").value.trim();
      const reviewText = document.getElementById("reviewText").value.trim();
      const validRating = isNaN(currentRating) ? 0 : currentRating;

      if (!reviewTitle || !reviewText || validRating === 0) {
        alert("Please fill all fields and select a rating.");
        return;
      }

      if (editingReviewCard) {
        editingReviewCard.querySelector(".review-title").textContent =
          reviewTitle;
        editingReviewCard.querySelector(".card-text span").textContent =
          reviewText;
        editingReviewCard.querySelector(".rating").innerHTML =
          generateStarHTML(validRating) + ` (${validRating})`;

        editingReviewCard = null;
      } else {
        addReviewCard(reviewTitle, reviewText, validRating);
      }

      const modal = document.getElementById("reviewModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      setTimeout(() => {
        showToast(
          "Your Review will help other parents make the right choice. Thank You!"
        );
      }, 500);

      this.reset();
      currentRating = 0;
      renderStars(0, "rating-modal", true);
    });

  function generateStarHTML(rating) {
    return Array.from(
      { length: 5 },
      (_, i) =>
        `<span class="fa ${rating >= i + 1 ? "fa-star" : "fa-star-o"}"></span>`
    ).join("");
  }

  function addReviewCard(title, text, rating) {
    const reviewContainer = document.getElementById("reviews-container");
    if (!reviewContainer) return;

    const newReview = document.createElement("div");
    newReview.classList.add("card", "card-review", "mb-3", "p-3", "p-md-4");
    newReview.innerHTML = `
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap">
        <div class="d-flex align-items-center flex-wrap">
          <img src="img/avatar.svg" alt="Avatar" class="card-avatar mb-2 me-2">
          <div>
            <h5 class="mb-1 review-title">${title}</h5>
            <small class="rating" data-rating="${rating}">
              ${generateStarHTML(rating)} (${rating})
            </small>
          </div>
        </div>
        <small class="text-muted pt-2">${formatDate(new Date())}</small>
      </div>
      <div class="card-body d-flex flex-column align-items-start flex-grow-1">
        <p class="card-text">
          <span>${text}</span>
        </p>
      </div>
      <div class="card-footer border-bottom-0 d-flex align-items-center justify-content-between flex-wrap py-0">
        <div class="d-flex flex-column">
          <span class="pb-3 text-secondary text-decoration-underline reply-count" data-replies="0">0 Replies</span>
        </div>
      </div>
    `;

    reviewContainer.appendChild(newReview);
  }

  const toastMessage = document.getElementById("toastMessageUpdated");

  function showToast(message) {
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
  }
});

// TAG
document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".tags-container");

  containers.forEach((container) => {
    const inputField = container.querySelector(".tag-input");
    const placeholder = container.querySelector(".placeholder");

    function addTag(text) {
      text = text.trim();
      if (text === "") return;

      const tag = document.createElement("span");
      tag.classList.add("tag-benefits");
      tag.innerHTML = `${text} <i class="bi bi-x mt-1"></i>`;

      tag.querySelector("i").addEventListener("click", function () {
        tag.remove();
        checkPlaceholder();
      });

      container.insertBefore(tag, inputField);
      inputField.value = "";
      checkPlaceholder();
    }

    function checkPlaceholder() {
      if (container.querySelectorAll(".tag-benefits").length > 0) {
        placeholder.style.display = "none";
      } else {
        placeholder.style.display = "inline";
      }
    }

    inputField.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addTag(inputField.value);
      }
    });

    inputField.addEventListener("focus", () => {
      placeholder.style.display = "none";
    });

    inputField.addEventListener("blur", () => {
      checkPlaceholder();
    });

    checkPlaceholder();
  });
});

// number of children
document.addEventListener("DOMContentLoaded", function () {
  const currencyInput = document.getElementById("currencyInputs");
  const kidsInput = document.getElementById("kidsInput");
  const discountAmountElement = document.getElementById("discountAmount");
  const numKidsElement = document.getElementById("numKids");

  function updateDiscountMessage() {
    const amount = currencyInput.value || 0;
    const numberOfKids = kidsInput.value || 0;

    discountAmountElement.textContent = amount;
    numKidsElement.textContent = numberOfKids;
  }

  currencyInput.addEventListener("input", updateDiscountMessage);
  kidsInput.addEventListener("input", updateDiscountMessage);

  updateDiscountMessage();
});

// ADD PHOTO/VIDEO
document.addEventListener("DOMContentLoaded", function () {
  const addPhotoButton = document.getElementById("addPhotoButton");
  const photoInput = document.getElementById("photoInput");
  const photoGallery = document.getElementById("photoGallery");

  addPhotoButton.addEventListener("click", () => {
    photoInput.click();
  });

  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (file) {
      const col = document.createElement("div");
      col.classList.add("col");

      const box = document.createElement("div");
      box.classList.add("box", "w-100");

      const boxInner = document.createElement("div");
      boxInner.classList.add("boxInner", "position-relative");

      const fileURL = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.classList.add("img-fluid", "rounded", "w-100");
        img.src = fileURL;

        boxInner.appendChild(img);
      } else if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.classList.add("img-fluid", "rounded", "w-100");
        video.src = fileURL;
        video.controls = true;

        boxInner.appendChild(video);
      }

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add(
        "bi",
        "bi-trash",
        "delete-image",
        "text-danger",
        "position-absolute"
      );
      deleteIcon.style.cursor = "pointer";
      deleteIcon.setAttribute("aria-label", "Delete");

      deleteIcon.addEventListener("click", () => {
        photoGallery.removeChild(col);
      });

      boxInner.appendChild(deleteIcon);
      box.appendChild(boxInner);
      col.appendChild(box);

      photoGallery.appendChild(col);
    }
  });

  photoGallery.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-image")) {
      const col = e.target.closest(".col");
      if (col) {
        photoGallery.removeChild(col);
      }
    }
  });
});

// ADD TEAM MEMBER
document.addEventListener("DOMContentLoaded", function () {
  const addTeamButton = document.getElementById("addTeamButton");
  const addMemberButtonModal = document.getElementById("addMemberButtonModal");
  const addMemberModal = new bootstrap.Modal(
    document.getElementById("addMemberModal")
  );
  const teamContainer = document.getElementById("teamContainer");

  const avatarUpload = document.getElementById("avatarUpload1");
  const avatarPreview = document.getElementById("avatarPreview1");

  avatarUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  teamContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-card")) {
      const card = event.target.closest(".col-md-6");
      if (card) {
        card.remove();
      }
    }
  });

  addTeamButton.addEventListener("click", function () {
    addMemberModal.show();
  });

  addMemberButtonModal.addEventListener("click", function () {
    const memberName = document.getElementById("memberName").value;
    const memberRole = document.getElementById("memberRole").value;
    const memberDescription =
      document.getElementById("memberDescription").value;

    const avatarSrc = avatarPreview.src || "img/profile-avatar.jpg";

    const newCard = document.createElement("div");
    newCard.classList.add("col-md-6");

    newCard.innerHTML = `
      <div class="card card-team h-100">
        <div class="card-body d-flex flex-column flex-sm-row">
          <img class="rounded-circle img-fluid me-3 mb-2 mb-sm-0 flex-shrink-0" loading="lazy" src="${avatarSrc}" alt="${memberName}">
          <div class="d-flex flex-column flex-grow-1">
            <p class="h5 mb-1">${memberName}</p>
            <p class="text-muted small mb-0">${memberRole}</p>
            <p class="mt-2 text-content">
              ${memberDescription}
            </p>
            <div class="py-sm-0 show-more text-primary mb-1">
              Show More
            </div>
          </div>
          <i class="bi bi-trash delete-card text-danger" style="cursor: pointer" aria-label="Delete"></i>
        </div>
      </div>
    `;

    teamContainer.appendChild(newCard);

    addMemberModal.hide();

    document.getElementById("memberName").value = "";
    document.getElementById("memberRole").value = "";
    document.getElementById("memberDescription").value = "";
    avatarPreview.src = "img/avatar-people.svg";

    const newShowMoreButton = newCard.querySelector(".show-more");
    const newTextContent = newCard.querySelector(".text-content");

    const lineHeight = parseFloat(
      window.getComputedStyle(newTextContent).lineHeight
    );
    const maxHeight = parseFloat(
      window.getComputedStyle(newTextContent).maxHeight
    );
    const linesCount = maxHeight / lineHeight;

    if (newTextContent.scrollHeight > newTextContent.clientHeight) {
      newShowMoreButton.style.display = "inline-block";

      newShowMoreButton.addEventListener("click", function () {
        newTextContent.classList.toggle("expanded");

        if (newTextContent.classList.contains("expanded")) {
          newShowMoreButton.textContent = "Show Less";
        } else {
          newShowMoreButton.textContent = "Show More";
        }
      });
    } else {
      newShowMoreButton.style.display = "none";
    }

    const deleteButton = newCard.querySelector(".delete-card");
    deleteButton.addEventListener("click", function () {
      teamContainer.removeChild(newCard);
    });
  });
});

// SHOW / HIDE Current Card Members
document.addEventListener("DOMContentLoaded", function () {
  initShowMoreFeature();

  document.querySelectorAll(".accordion-collapse").forEach((accordion) => {
    accordion.addEventListener("shown.bs.collapse", function () {
      initShowMoreFeature();
    });
  });
});

function initShowMoreFeature() {
  document.querySelectorAll(".text-wrap").forEach(function (container) {
    const textContent = container.querySelector(".text-content");
    const showMoreButton = container.querySelector(".show-more");

    if (!textContent || !showMoreButton) return;

    const lineHeight = parseFloat(getComputedStyle(textContent).lineHeight);
    const maxCollapsedHeight = lineHeight * 3;

    if (textContent.scrollHeight <= maxCollapsedHeight) {
      showMoreButton.style.display = "none";
      return;
    } else {
      showMoreButton.style.display = "block";
    }

    textContent.style.height = maxCollapsedHeight + "px";
    textContent.style.overflow = "hidden";

    showMoreButton.replaceWith(showMoreButton.cloneNode(true));
    const newShowMoreButton = container.querySelector(".show-more");

    newShowMoreButton.addEventListener("click", function () {
      if (textContent.style.overflow === "hidden") {
        textContent.style.height = textContent.scrollHeight + "px";
        textContent.style.overflow = "visible";
        newShowMoreButton.textContent = "Show Less";
      } else {
        textContent.style.height = maxCollapsedHeight + "px";
        textContent.style.overflow = "hidden";
        newShowMoreButton.textContent = "Show More";
      }
    });
  });
}

// PHONE - FAX
function formatPhoneOrFax(input) {
  let value = input.value;

  value = value.replace(/[^\d]/g, "");

  if (value.length > 3 && value.length <= 6) {
    value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
  } else if (value.length > 6) {
    value = `(${value.substring(0, 3)}) ${value.substring(
      3,
      6
    )}-${value.substring(6, 10)}`;
  }

  input.value = value;
}

document.getElementById("phoneInput").addEventListener("input", function (e) {
  formatPhoneOrFax(e.target);
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

    const ageContainer = el.querySelector(".years");
    if (ageContainer) {
      ageContainer.textContent = `(${ageText})`;
    }
  });
});
