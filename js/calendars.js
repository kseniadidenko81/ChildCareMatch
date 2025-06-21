// FILTER STATUS

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getCategory(dateStr) {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Устанавливаем начало и конец текущей недели (понедельник → воскресенье)
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(today.getDate() + offsetToMonday);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const date = new Date(dateStr.trim());
  if (isNaN(date.getTime())) return "unknown";

  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (d < today) return "past";
  if (isSameDay(d, today)) return "today";
  if (isSameDay(d, tomorrow)) return "tomorrow";
  if (d >= today && d <= endOfWeek) return "this-week";
  if (d > endOfWeek) return "later";

  return "unknown";
}

function filterCards(categoryValue) {
  const cards = document.querySelectorAll(".notification-box");

  cards.forEach((card) => {
    const dateText = card
      .querySelector(".notification-date")
      ?.textContent?.trim();
    if (!dateText) return;

    const cardCategory = getCategory(dateText);
    console.log("Дата карточки:", dateText, "→ категория:", cardCategory);

    if (categoryValue === "all") {
      card.style.display = "block";
    } else if (categoryValue === "this-week") {
      card.style.display =
        cardCategory === "this-week" ||
        cardCategory === "today" ||
        cardCategory === "tomorrow"
          ? "block"
          : "none";
    } else {
      card.style.display = cardCategory === categoryValue ? "block" : "none";
    }
  });
}

document
  .getElementById("customDropdownReguest")
  .addEventListener("click", () => {
    const options = document.getElementById("dropdownOptionsReguest");
    options.style.display =
      options.style.display === "block" ? "none" : "block";
  });

document
  .querySelectorAll("#dropdownOptionsReguest .dropdown-option")
  .forEach((option) => {
    option.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      const label = this.textContent.trim();

      const dropdown = document.getElementById("customDropdownReguest");
      dropdown.childNodes[0].nodeValue = label + " ";

      document.getElementById("dropdownOptionsReguest").style.display = "none";
      filterCards(value);
    });
  });

document.addEventListener("click", function (e) {
  const dropdown = document.getElementById("customDropdownReguest");
  const options = document.getElementById("dropdownOptionsReguest");
  if (!dropdown.contains(e.target) && !options.contains(e.target)) {
    options.style.display = "none";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  filterCards("all");
  document.getElementById("customDropdownReguest").childNodes[0].nodeValue =
    "All";
});

// Age Display
function calculateAgeDetailed(dateString) {
  const birthDate = new Date(dateString);
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
  }

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

    const genderMatch = el.textContent.trim().match(/[♂♀]/);
    const genderSymbol = genderMatch ? genderMatch[0] : "";

    const { years, months } = calculateAgeDetailed(birthdate);
    const ageText = `${years}yr${years !== 1 ? "s" : ""} ${months}mo`;

    el.textContent = `${genderSymbol} ${birthdate} (${ageText})`;
  });
});
