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
