// REVIEW

document.addEventListener("DOMContentLoaded", () => {
  let currentRating = 0;
  let currentAvatarSrc = "";
  let currentReplies = 0;
  let currentDeleteCardId = null;

  function getFormattedDate() {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
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
      ratingText.textContent = `${rating.toFixed(0)}`;
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

      const newTitle = document.getElementById("reviewTitle").value.trim();
      const newTitleMessage = document
        .getElementById("reviewTitleMessage")
        .value.trim();
      const newText = document.getElementById("reviewText").value.trim();
      const validRating = isNaN(currentRating) ? 0 : currentRating;
      const replies =
        parseInt(document.getElementById("currentRepliesField").value) || 0;

      const reviewData = {
        id: Date.now(),
        title: newTitle || "No Title",
        titleMessage: newTitleMessage,
        text: newText,
        rating: validRating,
        date: getFormattedDate(),
        avatarSrc: currentAvatarSrc || "img/default-avatar.svg",
        replies: replies,
      };

      let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.push(reviewData);
      localStorage.setItem("reviews", JSON.stringify(reviews));

      renderReviewCard(reviewData);

      bootstrap.Modal.getInstance(
        document.getElementById("reviewModal")
      ).hide();
      this.reset();

      currentAvatarSrc = "";
      currentReplies = 0;

      showToastUpdated();
    });

  function renderReviewCard(reviewData) {
    const reviewCard = document.createElement("div");
    reviewCard.className = "card card-review mt-4 w-100 p-3 p-md-4";
    reviewCard.id = `review-${reviewData.id}`;
    reviewCard.innerHTML = `
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap">
        <div class="d-flex align-items-center flex-wrap">
          <img src="${
            reviewData.avatarSrc
          }" alt="Avatar" class="card-avatar mb-2 me-2">
          <div>
            <h5 class="mb-0">${reviewData.title}</h5>
            <small class="rating" data-rating="${
              reviewData.rating
            }">${generateStarHTML(reviewData.rating)} (${
      reviewData.rating
    })</small>
          </div>
        </div>
        <small class="text-muted pt-2">${reviewData.date}</small>
      </div>
      <div class="card-body d-flex align-items-start flex-grow-1">
        <p class="card-text">
          <span class="fw-bold d-block pb-2">${reviewData.titleMessage}</span>
          ${reviewData.text}
        </p>
      </div>
      <div class="card-footer d-flex align-items-center justify-content-between flex-wrap py-0">
        <div class="d-flex flex-column">
          <div class="py-sm-0 show-more text-primary mb-1">Show More</div>
          <span class="pb-3 text-secondary text-decoration-underline reply-count" data-replies="${
            reviewData.replies
          }">${reviewData.replies} Replies</span>
        </div>
        <div class="btn-review-wrap d-flex flex-wrap justify-content-end ms-auto">
          <button class="btn btn-outline-primary edit-btn" data-id="${
            reviewData.id
          }" data-bs-toggle="modal" data-bs-target="#reviewModal">
            <i class="bi bi-pencil pe-1"></i>Edit
          </button>
          <button class="btn delete-btn ms-2" data-id="${reviewData.id}">
            <i class="bi bi-eye-slash pe-1"></i>Unpublish
          </button>
        </div>
      </div>`;

    reviewCard.querySelector(".edit-btn").addEventListener("click", () => {
      document.getElementById("reviewTitle").value = reviewData.title;
    });

    reviewCard.querySelector(".delete-btn").addEventListener("click", () => {
      currentDeleteCardId = reviewData.id;
      const deleteModal = new bootstrap.Modal(
        document.getElementById("deleteConfirmModal")
      );
      deleteModal.show();
    });

    document.getElementById("reviewsContainer").appendChild(reviewCard);
  }

  function generateStarHTML(rating) {
    return Array.from(
      { length: 5 },
      (_, i) =>
        `<span class="fa ${rating >= i + 1 ? "fa-star" : "fa-star-o"}"></span>`
    ).join("");
  }

  function loadReviewsFromLocalStorage() {
    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "";

    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    savedReviews.forEach(renderReviewCard);
  }

  loadReviewsFromLocalStorage();

  document.querySelector(".confirm-delete").addEventListener("click", () => {
    if (currentDeleteCardId) {
      deleteReviewFromLocalStorage(currentDeleteCardId);
      loadReviewsFromLocalStorage();
      currentDeleteCardId = null;
      bootstrap.Modal.getInstance(
        document.getElementById("deleteConfirmModal")
      ).hide();
      showToastUnpublish();
    }
  });

  function deleteReviewFromLocalStorage(id) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const updatedReviews = reviews.filter((review) => review.id !== Number(id));
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  }

  function showToast(toastElement) {
    toastElement.style.opacity = 0;
    toastElement.style.transform = "translateX(100%)";
    toastElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    toastElement.classList.add("show");

    setTimeout(() => {
      toastElement.style.opacity = 1;
      toastElement.style.transform = "translateX(0)";
    }, 10);

    setTimeout(() => {
      toastElement.style.opacity = 0;
      toastElement.style.transform = "translateX(100%)";
    }, 3000);

    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 3500);
  }

  function showToastUnpublish() {
    showToast(document.getElementById("toastMessage"));
    showToast(toastElement);
  }

  function showToastUpdated() {
    showToast(document.getElementById("toastMessageUpdated"));
    showToast(toastElement);
  }
});

// SHOW / HIDE

document.addEventListener("DOMContentLoaded", () => {
  const showMoreButtons = document.querySelectorAll(".show-more");

  showMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const extraText = button.closest(".card").querySelector(".extra-text");
      if (extraText) {
        extraText.classList.toggle("d-none");
        button.textContent = extraText.classList.contains("d-none")
          ? "Show More"
          : "Show Less";
      }
    });
  });

  const replyCountElements = document.querySelectorAll(".reply-count");

  replyCountElements.forEach((replyCountElement) => {
    const replies = parseInt(replyCountElement.dataset.replies);
    updateReplyCount(replyCountElement, replies);
  });

  function updateReplyCount(element, count) {
    if (element) {
      const replyText = getReplyText(count);
      element.textContent = replyText;
    }
  }

  function getReplyText(count) {
    if (count === 1) {
      return "1 Reply";
    } else if (count > 1 && count < 5) {
      return `${count} Replies`;
    } else {
      return `${count} Replies`;
    }
  }
});
