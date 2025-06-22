// CALENDAR
document.addEventListener("DOMContentLoaded", function () {
  var calendar = new FullCalendar.Calendar(
    document.getElementById("calendar"),
    {
      initialView: "dayGridMonth",
      selectable: true,
      timeZone: "America/New_York",

      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },

      select: function (info) {
        var startDate = moment(info.start).format("YYYY-MM-DD HH:mm A");
        var endDate = moment(info.end).format("YYYY-MM-DD HH:mm A");
        var modal = new bootstrap.Modal(document.querySelector(".modal"));
        modal.show();

        document.getElementById("starts-at").value = startDate;
        document.getElementById("ends-at").value = endDate;

        window.selectedEvent = null;
      },

      eventRender: function (info) {
        var startTime = moment(info.event.start).format("h:mm A");
        var endTime = info.event.end
          ? moment(info.event.end).format("h:mm A")
          : "N/A";

        var timeElement = info.el.querySelector(".fc-event-time");
        if (timeElement) {
          timeElement.style.display = "none";
        }

        info.el.querySelector(".fc-event-title").innerText =
          startTime + "\n" + endTime;
      },

      eventClick: function (info) {
        var modal = new bootstrap.Modal(document.querySelector(".modal"));
        modal.show();

        window.selectedEvent = info.event;

        document.getElementById("starts-at").value = moment(
          info.event.start
        ).format("YYYY-MM-DD HH:mm A");
        document.getElementById("ends-at").value = info.event.end
          ? moment(info.event.end).format("YYYY-MM-DD HH:mm A")
          : "";
      },
    }
  );

  calendar.render();

  $("#starts-at").datetimepicker({
    format: "Y-m-d H:i A",
    step: 30,
  });

  $("#ends-at").datetimepicker({
    format: "Y-m-d H:i A",
    step: 30,
  });

  document.getElementById("save-event").addEventListener("click", function () {
    var start = document.getElementById("starts-at").value;
    var end = document.getElementById("ends-at").value;

    if (start && end) {
      var startDate = moment(start, "YYYY-MM-DD HH:mm A").toDate();
      var endDate = moment(end, "YYYY-MM-DD HH:mm A").toDate();

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert("Invalid time format. Please try again.");
        return;
      }

      if (window.selectedEvent) {
        window.selectedEvent.setStart(startDate);
        window.selectedEvent.setEnd(moment(endDate).add(1, "days").toDate());
        window.selectedEvent.setProp(
          "title",
          moment(startDate).format("h:mm A") +
            "\n" +
            moment(endDate).format("h:mm A")
        );
      } else {
        calendar.addEvent({
          title:
            moment(startDate).format("h:mm A") +
            "\n" +
            moment(endDate).format("h:mm A"),
          start: startDate,
          end: moment(endDate).add(1, "days").toDate(),
        });
      }

      var modal = bootstrap.Modal.getInstance(document.querySelector(".modal"));
      modal.hide();

      document.getElementById("starts-at").value = "";
      document.getElementById("ends-at").value = "";
    }
  });

  document
    .getElementById("delete-event")
    .addEventListener("click", function () {
      if (window.selectedEvent) {
        window.selectedEvent.remove();

        var modal = bootstrap.Modal.getInstance(
          document.querySelector(".modal")
        );
        modal.hide();

        document.getElementById("starts-at").value = "";
        document.getElementById("ends-at").value = "";
        window.selectedEvent = null;
      } else {
        alert("Выберите событие для удаления.");
      }
    });

  var gridContainer = document.querySelector(".fc-scrollgrid-section-liquid");

  function checkHorizontalScroll() {
    var gridWidth = gridContainer.scrollWidth;
    var containerWidth = gridContainer.clientWidth;

    if (gridWidth > containerWidth) {
      gridContainer.style.overflowX = "auto";
    } else {
      gridContainer.style.overflowX = "hidden";
    }
  }

  checkHorizontalScroll();

  window.addEventListener("resize", checkHorizontalScroll);
});

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

  const dayOfWeek = today.getDay();
  const offset = (dayOfWeek + 6) % 7;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - offset);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const date = new Date(dateStr.trim());
  if (isNaN(date.getTime())) return "unknown";

  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (d < today) return "past";
  if (isSameDay(d, today)) return "today";
  if (isSameDay(d, tomorrow)) return "tomorrow";
  if (d >= startOfWeek && d <= endOfWeek) return "this-week";
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

// Add avatar
document.querySelectorAll(".avatar-preview").forEach((img) => {
  img.addEventListener("click", () => {
    const wrapper = img.closest(".avatar-wrapper");
    const input = wrapper.querySelector(".avatar-upload");
    input.click();
  });
});

document.querySelectorAll(".avatar-upload").forEach((input) => {
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const wrapper = input.closest(".avatar-wrapper");
      const preview = wrapper.querySelector(".avatar-preview");
      preview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
});

// MODAL COMMENT TEXTAREA
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modalTabNew");

  modal.addEventListener("show.bs.modal", function (event) {
    var button = event.relatedTarget;
    var commentText =
      button.getAttribute("data-comment") || "No comment available";

    var textarea = modal.querySelector("#reviewText");
    textarea.value = commentText.trim();
  });
});

// STATUS MODAL
document.addEventListener("DOMContentLoaded", function () {
  const viewButtons = document.querySelectorAll(".edit-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const status = button.getAttribute("data-status");

      const modalStatusElement = document.getElementById("modalStatus");

      modalStatusElement.classList.remove(
        "text-primary",
        "text-danger",
        "text-success"
      );

      const statusLiElement = modalStatusElement.querySelector("li");
      statusLiElement.textContent = status;

      if (status === "Sent") {
        modalStatusElement.classList.add("text-success");
      } else if (status === "Rejected") {
        modalStatusElement.classList.add("text-danger");
      } else if (status === "Canceled") {
        modalStatusElement.classList.add("text-info");
      } else if (status === "Scheduled") {
        modalStatusElement.classList.add("text-primary");
      } else if (status === "Closed") {
        modalStatusElement.classList.add("text-closed");
      }
    });
  });
});
