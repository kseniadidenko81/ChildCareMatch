// AUTO HEIGHT Navbar fixed menu
const navbarCollapse = document.getElementById("navbarsExample07");
const navbar = document.querySelector(".navbar");
const content = document.querySelector(".content");

function adjustContentMargin() {
  const navbarHeight = navbar.getBoundingClientRect().height;
  const collapseHeight = navbarCollapse.scrollHeight;

  let offset = 0;

  if (window.innerWidth <= 480) {
    offset = 80;
  } else if (window.innerWidth <= 990) {
    offset = 60;
  } else {
    offset = 0;
  }

  if (navbarCollapse.classList.contains("show")) {
    content.style.marginTop = `${navbarHeight + collapseHeight - offset}px`;
  } else {
    content.style.marginTop = `${navbarHeight}px`;
  }
}

navbarCollapse.addEventListener("shown.bs.collapse", adjustContentMargin);
navbarCollapse.addEventListener("hidden.bs.collapse", adjustContentMargin);

window.addEventListener("resize", adjustContentMargin);

adjustContentMargin();

// ADD Navbar Scrolled shadow
const navbarShadow = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbarShadow.classList.add("scrolled");
  } else {
    navbarShadow.classList.remove("scrolled");
  }
});

// SHOW/HIDE/CHANGE PASSWORD
let passwordField = document.getElementById("password");
let togglePassword = document.querySelector(".toggle-password");
let forgotPassword = document.getElementById("forgotPassword");

passwordField.addEventListener("input", function () {
  if (this.value.length > 0) {
    togglePassword.style.opacity = "1";
    togglePassword.style.pointerEvents = "auto";
  } else {
    togglePassword.style.opacity = "0.5";
    togglePassword.style.pointerEvents = "none";
  }
});

togglePassword.addEventListener("click", function () {
  if (passwordField.value.length > 0) {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
    }
  }
});

forgotPassword.addEventListener("click", function (event) {
  event.preventDefault();
  const forgotPasswordModal = new bootstrap.Modal(
    document.getElementById("forgotPasswordModal")
  );
  forgotPasswordModal.show();
});

document
  .getElementById("sendResetEmail")
  .addEventListener("click", function () {
    const email = document.getElementById("resetEmail").value.trim();
    const emailError = document.getElementById("emailError");

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailError.classList.remove("d-none");
      return;
    }

    emailError.classList.add("d-none");

    setTimeout(() => {
      alert(
        `На почту ${email} отправлено письмо с инструкцией по восстановлению пароля.`
      );
      const forgotPasswordModal = bootstrap.Modal.getInstance(
        document.getElementById("forgotPasswordModal")
      );
      forgotPasswordModal.hide();
    }, 1000);
  });

// The password is stored on the server, we make a request to the server. There should be a "POST /check-password" route on the server that will compare the password against the database.
document.getElementById("loginButton").addEventListener("click", function () {
  let inputPassword = document.getElementById("password").value;
  let passwordError = document.getElementById("passwordError");

  fetch("/check-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: inputPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.valid) {
        passwordError.classList.add("d-none");
        alert("Login successful!");
      } else {
        passwordError.classList.remove("d-none");
      }
    })
    .catch((error) => console.error("Error:", error));
});

// SEARCH LOCATION
function searchDayCare() {
  let location = document.getElementById("locationInput").value;
  let resultText = document.getElementById("searchResult");

  if (location.trim() === "") {
    resultText.innerHTML =
      "<span class='text-danger'>Please enter a valid location.</span>";
    return;
  }

  resultText.innerHTML = `🔎 Searching for day care centers in <strong>${location}</strong>...`;

  setTimeout(() => {
    resultText.innerHTML = `✅ Found several day care centers in <strong>${location}</strong>!`;
  }, 2000);
}

document
  .getElementById("locationInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchDayCare();
    }
  });

// CHANGE EMAIL/PASSWORD
function changeEmail() {
  var emailInput = document.getElementById("email");
  emailInput.value = "";
  emailInput.focus();
}

// Enable/Disable Email Notification
function toggleEmailNotifications() {
  var checkbox = document.getElementById("emailNotifications");
  if (checkbox.checked) {
    console.log("Email notifications enabled");
  } else {
    console.log("Email notifications disabled");
  }
}

// DELETE PROFILE
function deleteProfile() {
  console.log("Profile has been deleted.");

  var deleteModal = bootstrap.Modal.getInstance(
    document.getElementById("deleteProfileModal")
  );
  deleteModal.hide();

  alert("Your profile has been successfully deleted.");
}
