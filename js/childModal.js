// CHILD INFO
document.addEventListener("DOMContentLoaded", () => {
  let selectedGender = "";

  function saveData() {
    const cards = document.querySelectorAll(".card");
    const cardData = [];

    cards.forEach((card) => {
      const name = card.querySelector(".name").value;
      const dob = card.querySelector(".dob").value;
      const gender = card.querySelector(".gender").innerHTML;
      cardData.push({ name, dob, gender });
    });

    localStorage.setItem("childrenData", JSON.stringify(cardData));
  }

  function loadData() {
    const storedData = JSON.parse(localStorage.getItem("childrenData"));
    if (storedData) {
      storedData.forEach((data) =>
        addChildCard(data.name, data.dob, data.gender)
      );
    }
  }

  function addChildCard(name, dob, genderIcon) {
    const card = document.createElement("div");
    card.classList.add("card", "bg-light", "border-primary", "mt-3");

    card.innerHTML = `
      <div class="card-body d-flex flex-column flex-sm-row align-sm-items-center rounded">
        <div class="icon-box"><span class="gender">${genderIcon}</span></div>
        <span><small class="text-muted">Name:</small> <input type="text" class="form-control name" value="${name}" disabled /></span>
        <span><small class="text-muted">Date of Birth:</small> <input type="date" class="form-control dob" value="${dob}" disabled /></span>
        <div class="icon-box d-flex justify-content-end gap-2">
          <i class="bi bi-pencil text-primary edit-icon" style="cursor: pointer;" title="Edit"></i>
          <i class="bi bi-check-lg text-success confirm-edit-icon" style="cursor: pointer; display:none;" title="Confirm Edit"></i>
          <i class="bi bi-trash text-danger delete-icon" style="cursor: pointer;" title="Delete"></i>
        </div>
      </div>
    `;

    document.getElementById("childInfo").appendChild(card);

    const editIcon = card.querySelector(".edit-icon");
    const confirmIcon = card.querySelector(".confirm-edit-icon");
    const deleteIcon = card.querySelector(".delete-icon");
    const nameField = card.querySelector(".name");
    const dobField = card.querySelector(".dob");

    editIcon.addEventListener("click", () => {
      nameField.disabled = false;
      dobField.disabled = false;
      editIcon.style.display = "none";
      confirmIcon.style.display = "inline-block";
    });

    confirmIcon.addEventListener("click", () => {
      nameField.disabled = true;
      dobField.disabled = true;
      confirmIcon.style.display = "none";
      editIcon.style.display = "inline-block";
      saveData();
    });

    deleteIcon.addEventListener("click", () => {
      card.remove();
      saveData();
    });
  }

  loadData();

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

    saveData();
  });
});
