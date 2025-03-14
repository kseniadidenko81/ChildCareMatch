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
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("customDropdownReguest");
  const dropdownOptions = document.getElementById("dropdownOptionsReguest");
  const cards = document.querySelectorAll(".notification-box");
  const dropdownArrow = dropdown.querySelector(".dropdown-arrow i");

  dropdownArrow.classList.add("bi-chevron-down");

  dropdown.addEventListener("click", function () {
    dropdownOptions.classList.toggle("show");

    if (dropdownOptions.classList.contains("show")) {
      dropdownArrow.classList.remove("bi-chevron-down");
      dropdownArrow.classList.add("bi-chevron-up");
    } else {
      dropdownArrow.classList.remove("bi-chevron-up");
      dropdownArrow.classList.add("bi-chevron-down");
    }
  });

  dropdownOptions.addEventListener("click", function (event) {
    if (event.target.classList.contains("dropdown-option")) {
      const selectedStatus = event.target
        .getAttribute("data-value")
        .toLowerCase();

      dropdown.firstChild.textContent = event.target.textContent;

      dropdownOptions.classList.remove("show");

      dropdownArrow.classList.remove("bi-chevron-up");
      dropdownArrow.classList.add("bi-chevron-down");

      cards.forEach((card) => {
        const cardStatus = card
          .querySelector("ul li")
          .textContent.trim()
          .toLowerCase();

        if (selectedStatus === "all" || cardStatus === selectedStatus) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdown.contains(event.target) &&
      !dropdownOptions.contains(event.target)
    ) {
      dropdownOptions.classList.remove("show");

      dropdownArrow.classList.remove("bi-chevron-up");
      dropdownArrow.classList.add("bi-chevron-down");
    }
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
