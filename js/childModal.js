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
      storedData.forEach((data) => {
        const card = document.createElement("div");
        card.classList.add("card", "bg-light");

        const genderIcon = data.gender;

        card.innerHTML = `
          <div class="card-body d-flex flex-column flex-sm-row align-sm-items-center rounded">
            <div class="icon-box"><span class="gender">${genderIcon}</span></div>
            <span><small class="text-muted">Name:</small> <input type="text" class="form-control name" value="${data.name}" disabled /></span>
            <span><small class="text-muted">Date of Birth:</small> <input type="date" class="form-control dob" value="${data.dob}" disabled /></span>
						<div class="icon-box d-flex justify-content-end gap-2">
            <i class="bi bi-pencil text-primary edit-icon" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i>
            <i class="bi-save2 text-primary confirm-edit-icon" style="cursor: pointer; display:none;" data-bs-toggle="tooltip" data-bs-placement="top" title="Confirm Edit"></i>
            <i class="bi bi-trash text-danger delete-icon" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"></i></div>
          </div>
        `;

        document.getElementById("childInfo").appendChild(card);

        card.querySelector(".edit-icon").addEventListener("click", () => {
          const nameField = card.querySelector(".name");
          const dobField = card.querySelector(".dob");
          const genderField = card.querySelector(".gender");
          const confirmIcon = card.querySelector(".confirm-edit-icon");

          nameField.disabled = false;
          dobField.disabled = false;

          nameField.classList.add("editable-field");
          dobField.classList.add("editable-field");

          confirmIcon.style.display = "inline-block";
          card.querySelector(".edit-icon").style.display = "none";

          confirmIcon.addEventListener("click", () => {
            nameField.disabled = true;
            dobField.disabled = true;

            nameField.classList.remove("editable-field");
            dobField.classList.remove("editable-field");

            confirmIcon.style.display = "none";
            card.querySelector(".edit-icon").style.display = "inline-block";

            saveData();
          });
        });

        card.querySelector(".delete-icon").addEventListener("click", () => {
          card.remove();
          saveData();
        });
      });
    }
  }

  loadData();

  document.getElementById("maleIcon").addEventListener("click", () => {
    selectedGender = "Male";
    document.getElementById("maleIcon").classList.add("checked-male");
    document.getElementById("femaleIcon").classList.remove("checked-female");
    document.getElementById("maleText").classList.add("show-text");
    document.getElementById("femaleText").classList.remove("show-text");
  });

  document.getElementById("femaleIcon").addEventListener("click", () => {
    selectedGender = "Female";
    document.getElementById("femaleIcon").classList.add("checked-female");
    document.getElementById("maleIcon").classList.remove("checked-male");
    document.getElementById("femaleText").classList.add("show-text");
    document.getElementById("maleText").classList.remove("show-text");
  });

  document.getElementById("btnAddChild").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const dob = document.getElementById("dobInput").value;

    if (!selectedGender || !name || !dob) {
      alert("Please fill in all fields and select a gender!");
      return;
    }

    const card = document.createElement("div");
    card.classList.add("card", "bg-light", "border-primary", "mt-3");

    let genderIcon = "";
    if (selectedGender === "Male") {
      genderIcon = '<i class="fa fa-male"></i>';
    } else if (selectedGender === "Female") {
      genderIcon = '<i class="fa fa-female"></i>';
    }

    card.innerHTML = `
      <div class="card-body d-flex flex-column flex-sm-row align-sm-items-center rounded">
        <div class="icon-box"><span class="gender">${genderIcon}</span></div>
        <span><small class="text-muted">Name:</small> <input type="text" class="form-control name" value="${name}" disabled /></span>
        <span><small class="text-muted">Date of Birth:</small> <input type="date" class="form-control dob" value="${dob}" disabled /></span>
				<div class="icon-box d-flex justify-content-end gap-2">
        <i class="bi bi-pencil text-primary edit-icon" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"></i>
        <i class="bi-save2 text-success confirm-edit-icon" style="cursor: pointer; display:none;" data-bs-toggle="tooltip" data-bs-placement="top" title="Confirm Edit"></i>
        <i class="bi bi-trash text-danger delete-icon" style="cursor: pointer;" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"></i></div>
      </div>
    `;

    document.getElementById("childInfo").appendChild(card);

    document.getElementById("nameInput").value = "";
    document.getElementById("dobInput").value = "";
    document.getElementById("maleIcon").classList.remove("checked-male");
    document.getElementById("femaleIcon").classList.remove("checked-female");
    document.getElementById("maleText").classList.remove("show-text");
    document.getElementById("femaleText").classList.remove("show-text");
    selectedGender = "";

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("childModal")
    );
    modal.hide();

    saveData();
  });
});
