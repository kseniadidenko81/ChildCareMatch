// REVIEW

document.addEventListener("DOMContentLoaded", () => {
  let currentRating = 0;
  let editingReviewCard = null;

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
      ratingText.textContent = `${rating}`;
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
      const newText = document
        .getElementById("reviewText")
        .value.trim()
        .replace(/\s+/g, " ");
      const validRating = isNaN(currentRating) ? 0 : currentRating;

      if (editingReviewCard) {
        editingReviewCard.querySelector(".card-text").textContent = newText;
        editingReviewCard.querySelector(".rating").innerHTML =
          generateStarHTML(validRating) + ` (${validRating})`;

        editingReviewCard = null;
      }

      bootstrap.Modal.getInstance(
        document.getElementById("reviewModal")
      ).hide();
      this.reset();
    });

  function generateStarHTML(rating) {
    return Array.from(
      { length: 5 },
      (_, i) =>
        `<span class="fa ${rating >= i + 1 ? "fa-star" : "fa-star-o"}"></span>`
    ).join("");
  }

  document.querySelectorAll(".card-review").forEach((reviewCard) => {
    const editBtn = reviewCard.querySelector(".edit-btn");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        editingReviewCard = reviewCard;
        document.getElementById("reviewText").value = reviewCard
          .querySelector(".card-text")
          .textContent.trim()
          .replace(/\s+/g, " ");
        currentRating = parseInt(
          reviewCard.querySelector(".rating").dataset.rating
        );
        renderStars(currentRating, "rating-modal", true);
      });
    }
  });
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
