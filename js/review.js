// REVIEW

document.addEventListener("DOMContentLoaded", () => {
  let currentRating = 0;
  let currentReviewId = null;
  let currentAvatarSrc = "";

  function getFormattedDate() {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date().toLocaleDateString("en-US", options);
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
      let ratingText =
        starsContainer.querySelector(".rating-text") ||
        document.createElement("span");
      ratingText.className = "rating-text ms-2 fw-bold";
      ratingText.textContent = `${rating.toFixed(0)}`;
      starsContainer.appendChild(ratingText);
    }
  }

  document.getElementById("rating-modal").addEventListener("mousemove", (e) => {
    if (e.target.tagName === "SPAN")
      renderStars(parseInt(e.target.dataset.value), "rating-modal", true);
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
      const newTitleMessage =
        document.getElementById("reviewTitleMessage").value;
      const newText = document.getElementById("reviewText").value;

      console.log("Current Avatar Src before saving:", currentAvatarSrc);

      const validRating = isNaN(currentRating) ? 0 : currentRating;

      const reviewData = {
        id: currentReviewId || Date.now(),
        title: newTitle || "No Title",
        titleMessage: newTitleMessage || "",
        text: newText,
        rating: validRating,
        date: getFormattedDate(),
        avatarSrc: currentAvatarSrc || "img/default-avatar.svg",
      };

      console.log("Review data to be saved:", reviewData);

      let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      if (currentReviewId) {
        reviews = reviews.map((r) =>
          r.id === currentReviewId ? reviewData : r
        );
      } else {
        reviews.push(reviewData);
      }
      localStorage.setItem("reviews", JSON.stringify(reviews));

      renderReviewCard(reviewData);

      bootstrap.Modal.getInstance(
        document.getElementById("reviewModal")
      ).hide();
      this.reset();

      currentReviewId = null;
      currentAvatarSrc = "";
    });

  function renderReviewCard(reviewData) {
    console.log("Rendering review card for:", reviewData);

    const reviewsContainer = document.getElementById("reviewsContainer");
    const reviewCard = document.createElement("div");
    reviewCard.className = "card card-review mt-4 w-100 p-3 p-md-4";
    reviewCard.id = `review-${reviewData.id}`;
    reviewCard.innerHTML = `
      <div class="card-header d-flex align-items-center justify-content-between flex-wrap">
        <div class="d-flex align-items-center flex-wrap">
          <img src="${
            reviewData.avatarSrc
          }" alt="Avatar" class="card-avatar me-2">
          <div>
            <h5 class="mb-0">${reviewData.title}</h5>
            <small class="rating" data-rating="${reviewData.rating}">
              ${generateStarHTML(reviewData.rating)} (${reviewData.rating})
            </small>
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
          <a href="#" class="py-sm-0 show-more mb-1">Show More</a>
          <span class="pb-3 text-secondary text-decoration-underline reply-count" data-replies="0">0 Replies</span>
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

    reviewCard.querySelector(".delete-btn").addEventListener("click", () => {
      reviewCard.remove();
      deleteReviewFromLocalStorage(reviewData.id);
    });

    reviewCard.querySelector(".edit-btn").addEventListener("click", () => {
      currentReviewId = reviewData.id;
      currentAvatarSrc = reviewData.avatarSrc;

      console.log("Editing review, current avatar src:", currentAvatarSrc);

      document.getElementById("reviewTitle").value = reviewData.title;
      document.getElementById("reviewTitleMessage").value = "";
      document.getElementById("reviewText").value = "";

      const avatarPreview = document.getElementById("avatarPreview");
      avatarPreview.src = currentAvatarSrc || "img/default-avatar.svg";

      currentRating = reviewData.rating;
      renderStars(currentRating, "rating-modal", true);
    });

    reviewsContainer.appendChild(reviewCard);
  }

  function generateStarHTML(rating) {
    rating = isNaN(rating) ? 0 : rating;
    return Array.from(
      { length: 5 },
      (_, i) =>
        `<span class="fa ${rating >= i + 1 ? "fa-star" : "fa-star-o"}"></span>`
    ).join("");
  }

  function deleteReviewFromLocalStorage(id) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    localStorage.setItem(
      "reviews",
      JSON.stringify(reviews.filter((r) => r.id !== id))
    );
  }

  function loadReviewsFromLocalStorage() {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    savedReviews.forEach(renderReviewCard); // Render all saved review cards
  }

  loadReviewsFromLocalStorage();
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

// document.addEventListener("DOMContentLoaded", () => {
//   let currentRating = 0;
//   let currentReviewId = null;

//   function getFormattedDate() {
//     const options = {
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     };
//     return new Date().toLocaleDateString("en-US", options);
//   }

//   function renderStars(rating, containerId, showRatingText = false) {
//     const starsContainer = document.getElementById(containerId);
//     if (!starsContainer) {
//       console.error(`Container with ID "${containerId}" not found.`);
//       return;
//     }

//     if (isNaN(rating) || rating < 0 || rating > 5) {
//       rating = 0;
//     }

//     starsContainer.innerHTML = "";

//     for (let i = 1; i <= 5; i++) {
//       const star = document.createElement("span");
//       star.classList.add("fa");

//       if (rating >= i) {
//         star.classList.add("fa-star");
//       } else {
//         star.classList.add("fa-star-o");
//       }

//       star.dataset.value = i;
//       starsContainer.appendChild(star);
//     }

//     if (showRatingText) {
//       let ratingText = starsContainer.querySelector(".rating-text");
//       if (!ratingText) {
//         ratingText = document.createElement("span");
//         ratingText.className = "rating-text ms-2 fw-bold";
//         starsContainer.appendChild(ratingText);
//       }
//       ratingText.textContent = `${rating.toFixed(0)}`;
//     }
//   }

//   document.getElementById("rating-modal").addEventListener("mousemove", (e) => {
//     if (e.target.tagName === "SPAN") {
//       const hoverRating = parseInt(e.target.dataset.value, 10);
//       renderStars(hoverRating, "rating-modal", true);
//     }
//   });

//   document.getElementById("rating-modal").addEventListener("click", (e) => {
//     if (e.target.tagName === "SPAN") {
//       currentRating = parseInt(e.target.dataset.value, 10);
//       renderStars(currentRating, "rating-modal", true);
//     }
//   });

//   document
//     .getElementById("reviewForm")
//     .addEventListener("submit", function (e) {
//       e.preventDefault();

//       const newTitle = document.getElementById("reviewTitle").value.trim();
//       const newTitleMessage =
//         document.getElementById("reviewTitleMessage").value;
//       const newText = document.getElementById("reviewText").value;
//       const newRating = currentRating;

//       if (isNaN(newRating) || newRating < 0 || newRating > 5) {
//         currentRating = 0;
//       }

//       const newDate = getFormattedDate();

//       const reviewData = {
//         id: currentReviewId || Date.now(),
//         title: newTitle || "No Title",
//         titleMessage: newTitleMessage || "",
//         text: newText,
//         rating: currentRating,
//         date: newDate,
//       };

//       const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

//       if (currentReviewId) {
//         const updatedReviews = reviews.map((review) =>
//           review.id === currentReviewId ? reviewData : review
//         );
//         localStorage.setItem("reviews", JSON.stringify(updatedReviews));
//       } else {
//         reviews.push(reviewData);
//         localStorage.setItem("reviews", JSON.stringify(reviews));
//       }

//       renderReviewCard(reviewData);

//       bootstrap.Modal.getInstance(
//         document.getElementById("reviewModal")
//       ).hide();

//       this.reset();
//       currentReviewId = null;
//     });

//   function renderReviewCard(reviewData) {
//     const reviewsContainer = document.getElementById("reviewsContainer");
//     if (!reviewsContainer) {
//       console.error("Reviews container not found!");
//       return;
//     }

//     if (
//       isNaN(reviewData.rating) ||
//       reviewData.rating < 0 ||
//       reviewData.rating > 5
//     ) {
//       reviewData.rating = 0;
//     }

//     const reviewCard = document.createElement("div");

//     reviewCard.className = "card card-review mt-4 w-100 p-3 p-md-4";
//     reviewCard.id = `review-${reviewData.id}`;
//     reviewCard.innerHTML = `
//       <div class="card-header d-flex align-items-center justify-content-between flex-wrap">
//         <div class="d-flex align-items-center flex-wrap">
//           <img src="img/avatar-2.svg" alt="Avatar" class="card-avatar me-2">
//           <div>
//             <h5 class="mb-0">${reviewData.title}</h5>
//             <small class="rating" data-rating="${reviewData.rating}">
//               ${generateStarHTML(reviewData.rating)} (${reviewData.rating})
//             </small>
//           </div>
//         </div>
//         <small class="text-muted pt-2">${reviewData.date}</small>
//       </div>
//       <div class="card-body d-flex align-items-start flex-grow-1">
//         <p class="card-text">
//           <span class="fw-bold d-block pb-2"> ${
//             reviewData.titleMessage || ""
//           }</span>
//           ${reviewData.text}
//         </p>
//       </div>
//       <div class="card-footer d-flex align-items-center justify-content-between flex-wrap py-0">
//         <div class="d-flex flex-column">
//           <a href="#" class="py-sm-0 show-more mb-1">Show More</a>
//           <span class="pb-3 text-secondary text-decoration-underline reply-count" data-replies="0">0 Replies</span>
//         </div>
//         <div class="btn-review-wrap d-flex flex-wrap justify-content-end ms-auto">
//           <button class="btn btn-outline-primary edit-btn" data-id="${
//             reviewData.id
//           }" data-bs-toggle="modal" data-bs-target="#reviewModal">
//             <i class="bi bi-pencil pe-1"></i>Edit
//           </button>
//           <button class="btn delete-btn ms-2" data-id="${reviewData.id}">
//             <i class="bi bi-eye-slash pe-1"></i>Unpublish
//           </button>
//         </div>
//       </div>
//     `;

//     const deleteBtn = reviewCard.querySelector(".delete-btn");
//     deleteBtn.addEventListener("click", () => {
//       reviewCard.remove();
//       deleteReviewFromLocalStorage(reviewData.id);
//     });

//     const editBtn = reviewCard.querySelector(".edit-btn");
//     editBtn.addEventListener("click", (e) => {
//       console.log("Edit button clicked for review ID:", reviewData.id);

//       currentReviewId = reviewData.id;

//       console.log("Current Review ID:", currentReviewId);

//       document.getElementById("reviewTitle").value = reviewData.title;
//       document.getElementById("reviewTitleMessage").value = "";
//       document.getElementById("reviewText").value = "";

//       currentRating = reviewData.rating;
//       renderStars(currentRating, "rating-modal", true);
//     });

//     reviewsContainer.appendChild(reviewCard);
//   }

//   function generateStarHTML(rating) {
//     let starsHTML = "";
//     for (let i = 1; i <= 5; i++) {
//       starsHTML += `<span class="fa ${
//         rating >= i ? "fa-star" : "fa-star-o"
//       }"></span>`;
//     }
//     return starsHTML;
//   }

//   function deleteReviewFromLocalStorage(reviewId) {
//     let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
//     reviews = reviews.filter((review) => review.id !== reviewId);
//     localStorage.setItem("reviews", JSON.stringify(reviews));
//   }

//   function loadReviewsFromLocalStorage() {
//     const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
//     reviews.forEach((review) => renderReviewCard(review));
//   }

//   loadReviewsFromLocalStorage();
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const showMoreButtons = document.querySelectorAll(".show-more");

//   showMoreButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       e.preventDefault();

//       const extraText = button.closest(".card").querySelector(".extra-text");
//       if (extraText) {
//         extraText.classList.toggle("d-none");
//         button.textContent = extraText.classList.contains("d-none")
//           ? "Show More"
//           : "Show Less";
//       }
//     });
//   });

//   const replyCountElements = document.querySelectorAll(".reply-count");

//   replyCountElements.forEach((replyCountElement) => {
//     const replies = parseInt(replyCountElement.dataset.replies);
//     updateReplyCount(replyCountElement, replies);
//   });

//   function updateReplyCount(element, count) {
//     if (element) {
//       const replyText = getReplyText(count);
//       element.textContent = replyText;
//     }
//   }

//   function getReplyText(count) {
//     if (count === 1) {
//       return "1 Reply";
//     } else if (count > 1 && count < 5) {
//       return `${count} Replies`;
//     } else {
//       return `${count} Replies`;
//     }
//   }
// });
