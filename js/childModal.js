// CHILD INFO

document.addEventListener("DOMContentLoaded", () => {
  let selectedGender = "";

  function addChildCard(name, dob, genderIcon) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-body d-flex flex-column flex-sm-row align-sm-items-center rounded">
        <div class="icon-box position-relative d-flex align-items-center">
          <div class="form-check form-switch position-absolute" style="display:none;">
            <input class="form-check-input gender-switch" type="checkbox" ${
              genderIcon.includes("female") ? "checked" : ""
            }>
          </div>
          <span class="gender">${genderIcon}</span>
        </div>
        <span class="text-start"><small class="text-muted">Name:</small> <input type="text" class="form-control name" value="${name}" disabled /></span>
        <span class="text-start"><small class="text-muted">Date of Birth:</small> <input type="date" class="form-control dob" value="${dob}" disabled /></span>

        <div class="icon-box d-flex align-items-center justify-content-end gap-2">
          <a href="#" class="edit-link text-primary">Edit Profile</a>
          <i class="bi bi-trash text-danger delete-icon" style="cursor: pointer;"></i>
        </div>
      </div>
    `;

    document.getElementById("childInfo").appendChild(card);

    const editLink = card.querySelector(".edit-link");
    const deleteIcon = card.querySelector(".delete-icon");
    const nameField = card.querySelector(".name");
    const dobField = card.querySelector(".dob");
    const genderSwitch = card.querySelector(".gender-switch");
    const genderSpan = card.querySelector(".gender");
    const genderSwitchContainer = genderSwitch.closest(".form-check");

    nameField.disabled = true;
    dobField.disabled = true;
    genderSwitch.disabled = true;
    genderSwitchContainer.style.display = "none";

    editLink.addEventListener("click", (e) => {
      e.preventDefault();
    });

    genderSwitch.addEventListener("change", () => {
      genderSpan.innerHTML = genderSwitch.checked
        ? '<i class="fa fa-female"></i>'
        : '<i class="fa fa-male"></i>';
    });

    deleteIcon.addEventListener("click", () => {
      card.remove();
    });
  }

  document.getElementById("maleIcon").addEventListener("click", () => {
    selectedGender = "Male";
    document.getElementById("maleIcon").classList.add("checked-male");
    document.getElementById("femaleIcon").classList.remove("checked-female");
  });

  document.getElementById("femaleIcon").addEventListener("click", () => {
    selectedGender = "Female";
    document.getElementById("femaleIcon").classList.add("checked-female");
    document.getElementById("maleIcon").classList.remove("checked-male");
  });

  document.getElementById("btnAddChild").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const dob = document.getElementById("dobInput").value;

    if (!selectedGender || !name || !dob) {
      alert("Please fill in all fields and select a gender!");
      return;
    }

    let genderIcon =
      selectedGender === "Male"
        ? '<i class="fa fa-male"></i>'
        : '<i class="fa fa-female"></i>';
    addChildCard(name, dob, genderIcon);

    document.getElementById("nameInput").value = "";
    document.getElementById("dobInput").value = "";
    document.getElementById("maleIcon").classList.remove("checked-male");
    document.getElementById("femaleIcon").classList.remove("checked-female");
    selectedGender = "";

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("childModal")
    );
    modal.hide();
  });
});
