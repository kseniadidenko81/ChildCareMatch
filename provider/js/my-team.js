//RESET TOAST DATA
document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const saveToast = document.getElementById("saveToast");

  function showToast(toastElement) {
    toastElement.style.opacity = "0";
    toastElement.style.transform = "translateX(100%)";
    toastElement.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    toastElement.classList.add("show");

    setTimeout(() => {
      toastElement.style.opacity = "1";
      toastElement.style.transform = "translateX(0)";
    }, 10);

    setTimeout(() => {
      toastElement.style.opacity = "0";
      toastElement.style.transform = "translateX(100%)";
    }, 3000);

    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 3500);
  }

  saveButton.addEventListener("click", function () {
    showToast(saveToast);
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
