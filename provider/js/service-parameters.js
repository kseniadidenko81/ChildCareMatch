// CHECKBOX COLOR/BORDER
function toggleBorderColor(checkbox) {
  const parent = checkbox.closest(".form-check");

  if (checkbox.checked) {
    parent.style.setProperty(
      "border-color",
      "rgb(103, 80, 249, 0.3)",
      "important"
    );
    parent
      .querySelector("label")
      .style.setProperty("color", "#6750f9", "important");
  } else {
    parent.style.setProperty("border-color", "#dee2e6", "important");
    parent
      .querySelector("label")
      .style.setProperty("color", "#212529", "important");
  }
}

// SET DAYS / FROM / TO
document.addEventListener("DOMContentLoaded", function () {
  const scheduleBlocks = document.getElementById("scheduleBlocks");
  const addScheduleBlockButton = document.getElementById("addScheduleBlock");

  function addDropdownFunctionality(block) {
    const dropdownButton = block.querySelector(".dropdownMenuButton");
    const dropdownMenu = block.querySelector(".dropdownMenu");
    const chevronIcon = block.querySelector(".bi-chevron-down");
    const options = block.querySelectorAll(".select-day");

    dropdownButton.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdownMenu.classList.toggle("d-none");
      dropdownMenu.classList.toggle("d-flex");
      dropdownMenu.classList.toggle("flex-row");

      if (dropdownMenu.classList.contains("d-flex")) {
        chevronIcon.style.transform = "rotate(180deg)";
      } else {
        chevronIcon.style.transform = "rotate(0deg)";
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        dropdownButton.innerHTML = `${this.dataset.value} <i class="bi bi-chevron-down ms-2"></i>`;
        dropdownMenu.classList.add("d-none");
        dropdownMenu.classList.remove("d-flex", "flex-row");

        chevronIcon.style.transform = "rotate(0deg)";
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !dropdownButton.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.add("d-none");
        dropdownMenu.classList.remove("d-flex", "flex-row");

        chevronIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  function addTimeFunctionality(block) {
    const timeInputs = block.querySelectorAll(".timeInput");

    timeInputs.forEach((timeInput) => {
      const amPmDisplay = timeInput.nextElementSibling;

      timeInput.addEventListener("input", function () {
        if (timeInput.value) {
          let [hours, minutes] = timeInput.value.split(":");
          let hoursInt = parseInt(hours, 10);
          let amPm = hoursInt >= 12 ? "PM" : "AM";

          if (hoursInt > 12) {
            hoursInt -= 12;
          } else if (hoursInt === 0) {
            hoursInt = 12;
          }

          amPmDisplay.value = amPm;
          amPmDisplay.classList.remove("d-none");
        } else {
          amPmDisplay.classList.add("d-none");
        }
      });
    });
  }

  function createScheduleBlock() {
    const block = document.createElement("div");
    block.classList.add("row", "g-3", "mt-2", "schedule-block");

    block.innerHTML = `
      <div class="col-md-5">
        <div class="mb-2">Set day(s)</div>
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle w-100 dropdownMenuButton" type="button">
            Select Days
          </button><i class="bi bi-chevron-down ms-2 position-absolute me-2 mt-2 end-0"></i>
          <ul class="dropdown-menu w-100 dropdownMenu mt-1 p-2 border-primary d-flex flex-column d-none">
            <li class="d-flex justify-content-between flex-row w-100 border-bottom">
              <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Mon-Fri">Mon-Fri</label>
              <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Mon-Sun">Mon-Sun</label>
              <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Sat-Sun">Sat-Sun</label>
            </li>
            <li class="d-flex flex-wrap w-100">
              <ul class="d-flex flex-row w-100 ps-0">
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Mon">Mon</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Tue">Tue</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Wed">Wed</label>
                </li>
              </ul>
              <ul class="d-flex flex-row w-100 ps-0">
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Thu">Thu</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Fri">Fri</label>
                </li>
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Sat">Sat</label>
                </li>
              </ul>
              <ul class="d-flex flex-row w-100 ps-0">
                <li class="d-flex flex-column flex-grow-1">
                  <label class="dropdown-header select-day fs-6 text-dark fw-semibold p-2" data-value="Sun">Sun</label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-3 position-relative">
        <label class="form-label">From</label>
        <input type="time" class="form-control timeInput">
        <input type="text" class="form-control ampm-display d-none" readonly>
      </div>

      <div class="col-md-3 position-relative">
        <label class="form-label">To</label>
        <input type="time" class="form-control timeInput">
        <input type="text" class="form-control ampm-display d-none" readonly>
      </div>

      <div class="col-sm-1 d-flex flex-column justify-content-center align-items-end align-items-sm-center">
        <div class="mb-2 d-none d-sm-block opacity-0">Text</div>
        <i class="bi bi-trash text-danger remove-location" style="cursor: pointer"></i>
      </div>
    `;

    scheduleBlocks.appendChild(block);

    addDropdownFunctionality(block);
    addTimeFunctionality(block);
    addRemoveFunctionality(block);
  }

  function addRemoveFunctionality(block) {
    const removeButton = block.querySelector(".remove-location");
    const chevronIcon = block.querySelector(".bi-chevron-down");

    if (removeButton) {
      removeButton.addEventListener("click", function () {
        block.remove();
        checkDefaultBlock();
      });
    }
  }

  function checkDefaultBlock() {
    if (scheduleBlocks.children.length === 0) {
      createScheduleBlock();
    }
  }

  addScheduleBlockButton.addEventListener("click", createScheduleBlock);

  addDropdownFunctionality(document.querySelector(".schedule-block"));
  addTimeFunctionality(document.querySelector(".schedule-block"));
  addRemoveFunctionality(document.querySelector(".schedule-block"));
});

// CUSTOM DROPDOWN
document.addEventListener("DOMContentLoaded", function () {
  const customDropdown = document.getElementById("placeDropdown");
  const dropdownOptions = document.getElementById("placeDropdownOptions");

  customDropdown.addEventListener("click", function () {
    customDropdown.classList.toggle("open");
    dropdownOptions.classList.toggle("open");
  });

  const options = dropdownOptions.querySelectorAll(".dropdown-option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedValue = this.textContent;
      customDropdown.querySelector("span").textContent = selectedValue;
      customDropdown.classList.remove("open");
      dropdownOptions.classList.remove("open");
    });
  });

  document.addEventListener("click", function (e) {
    if (!customDropdown.contains(e.target)) {
      customDropdown.classList.remove("open");
      dropdownOptions.classList.remove("open");
    }
  });
});

// DROPDOWN MENU SLIDER
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.querySelector(".dropdownMenuButton");
  const dropdownMenu = document.querySelector(".dropdownMenu");
  const arrowIcon = dropdownButton.querySelector("i");

  dropdownButton.addEventListener("click", function (event) {
    const isOpen = dropdownMenu.classList.contains("show");

    if (isOpen) {
      dropdownMenu.classList.remove("show");
      dropdownButton.classList.remove("open");
      arrowIcon.classList.remove("rotate-up");
    } else {
      dropdownMenu.classList.add("show");
      dropdownButton.classList.add("open");
      arrowIcon.classList.add("rotate-up");
    }
  });

  document.querySelectorAll(".select-day").forEach((option) => {
    option.addEventListener("click", function () {
      const selectedValue = this.dataset.value;
      dropdownButton.innerHTML = `${selectedValue} <i class="bi bi-chevron-down ms-2"></i>`;

      dropdownMenu.classList.remove("show");
      dropdownButton.classList.remove("open");
      arrowIcon.classList.remove("rotate-up");
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show");
      dropdownButton.classList.remove("open");
      arrowIcon.classList.remove("rotate-up");
    }
  });
});

// RANGE SLIDER
document.addEventListener("DOMContentLoaded", function () {
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");
  const progressBar = document.querySelector(".progress-bar");

  const minPriceTooltip = document.createElement("span");
  const maxPriceTooltip = document.createElement("span");

  minPriceTooltip.className = "price-tooltip";
  maxPriceTooltip.className = "price-tooltip";

  minPrice.parentNode.appendChild(minPriceTooltip);
  maxPrice.parentNode.appendChild(maxPriceTooltip);

  let minGap = 50;

  function updateRange() {
    let minVal = parseInt(minPrice.value);
    let maxVal = parseInt(maxPrice.value);

    if (maxVal - minVal < minGap) {
      if (this === minPrice) {
        minPrice.value = maxVal - minGap;
      } else {
        maxPrice.value = minVal + minGap;
      }
    } else {
      minPriceInput.value = minPrice.value;
      maxPriceInput.value = maxPrice.value;

      let percentMin = (minPrice.value / minPrice.max) * 100;
      let percentMax = (maxPrice.value / maxPrice.max) * 100;

      progressBar.style.left = percentMin + "%";
      progressBar.style.right = 100 - percentMax + "%";

      updateTooltips();
    }
  }

  function updateInputs() {
    let minVal = parseInt(minPriceInput.value);
    let maxVal = parseInt(maxPriceInput.value);

    if (
      maxVal - minVal >= minGap &&
      minVal >= minPrice.min &&
      maxVal <= maxPrice.max
    ) {
      minPrice.value = minVal;
      maxPrice.value = maxVal;
      updateRange();
    }
  }

  function updateTooltips() {
    let percentMin = (minPrice.value / minPrice.max) * 100;
    let percentMax = (maxPrice.value / maxPrice.max) * 100;

    minPriceTooltip.textContent = `${minPrice.value}$`;
    maxPriceTooltip.textContent = `${maxPrice.value}$`;

    minPriceTooltip.style.left = `calc(${percentMin}% - 15px)`;
    maxPriceTooltip.style.left = `calc(${percentMax}% - 15px)`;
  }

  minPrice.addEventListener("input", updateRange);
  maxPrice.addEventListener("input", updateRange);
  minPriceInput.addEventListener("change", updateInputs);
  maxPriceInput.addEventListener("change", updateInputs);

  updateRange();
});

//TAGS INPUT
$(document).ready(function () {
  $("#selectedTags").click(function () {
    $("#dropdownMenu").toggle();
  });

  $("#dropdownMenu div").click(function () {
    var value = $(this).data("value");
    addTag(value);
    $(this).hide();
    $("#dropdownMenu").hide();
  });

  function addTag(value) {
    $("#inputField").addClass("hidden");

    var tagHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeTag(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedTags").append(tagHtml);
  }

  window.removeTag = function (element, value) {
    $(element).parent().remove();
    $("#dropdownMenu div[data-value='" + value + "']").show();

    if ($("#selectedTags .tag").length === 0) {
      $("#inputField").removeClass("hidden");
    }
  };

  $(document).click(function (event) {
    if (!$(event.target).closest(".dropdown").length) {
      $("#dropdownMenu").hide();
    }
  });
});

// LANGUAGE
$(document).ready(function () {
  $("#selectedLanguages").click(function () {
    $("#languagesMenu").toggle();
  });

  $("#languagesMenu div").click(function () {
    var value = $(this).data("value");
    addLanguage(value);
    $(this).hide();
    $("#languagesMenu").hide();
  });

  function addLanguage(value) {
    $("#inputFieldLanguages").addClass("hidden");

    var languageHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeLanguage(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedLanguages").append(languageHtml);
  }

  window.removeLanguage = function (element, value) {
    $(element).parent().remove();
    $("#languagesMenu div[data-value='" + value + "']").show();

    if ($("#selectedLanguages .tag").length === 0) {
      $("#inputFieldLanguages").removeClass("hidden");
    }
  };

  $(document).click(function (event) {
    if (!$(event.target).closest(".dropdown").length) {
      $("#languagesMenu").hide();
    }
  });
});

// RESET ALL
$(document).ready(function () {
  $("#inputFieldTags").click(function () {
    $("#tagsMenu").toggle();
  });

  $("#tagsMenu div").click(function () {
    var value = $(this).data("value");
    addTag(value);
    $(this).hide();
    $("#tagsMenu").hide();
  });

  $("#inputFieldDays").click(function () {
    $("#daysMenu").toggle();
  });

  $("#daysMenu li").click(function () {
    var value = $(this).text();
    addDay(value);
    $(this).hide();
    $("#daysMenu").hide();
  });

  function addTag(value) {
    var tagHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeTag(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedTags").append(tagHtml);
    toggleInputField();
  }

  window.removeTag = function (element, value) {
    $(element).parent().remove();
    $("#tagsMenu div[data-value='" + value + "']").show();
    toggleInputField();
  };

  function addDay(value) {
    var dayHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeDay(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedDays").append(dayHtml);
  }

  window.removeDay = function (element, value) {
    $(element).parent().remove();
    $("#daysMenu li:contains('" + value + "')").show();
  };

  function addLanguage(value) {
    var languageHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeLanguage(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedLanguages").append(languageHtml);
    toggleInputFieldLanguages();
  }

  window.removeLanguage = function (element, value) {
    $(element).parent().remove();
    $("#languagesMenu div[data-value='" + value + "']").show();
    toggleInputFieldLanguages();
  };

  function toggleInputField() {
    if ($("#selectedTags .tag").length > 0) {
      $("#inputField").hide();
    } else {
      $("#inputField").show();
    }
  }

  function toggleInputFieldLanguages() {
    if ($("#selectedLanguages .tag").length > 0) {
      $("#inputFieldLanguages").hide();
    } else {
      $("#inputFieldLanguages").show();
    }
  }

  $("#resetButton").click(function () {
    $("input[type='checkbox']").prop("checked", false);
    $("#selectedTags .tag").remove();

    $("#selectedDays").empty();
    $("#daysMenu li").show();

    $("#selectedLanguages .tag").remove();
    $("#languagesMenu div").show();

    $("#minPrice").val(200);
    $("#maxPrice").val(1550);
    $("#minPriceInput").val(200);
    $("#maxPriceInput").val(1550);

    $(".price-tooltip").each(function (index) {
      if (index === 0) {
        $(this).text("200$");
        $(this).css("left", "calc(2% - 15px)");
      } else {
        $(this).text("1550$");
        $(this).css("left", "calc(8% - 15px)");
      }
    });

    $("#minPrice").trigger("input");
    $("#maxPrice").trigger("input");

    $(".progress-bar").css("left", "2%");
    $(".progress-bar").css("right", "84%");

    $("#inputField")
      .removeClass("hidden")
      .css("display", "inline-block !important");

    $("#inputFieldLanguages")
      .removeClass("hidden")
      .css("display", "inline-block !important");

    $(".form-check").each(function () {
      $(this).css({
        "border-color": "",
        "background-color": "",
      });
      $(this).find("label").css("color", "");
      $(this).find("i").css("color", "");
    });

    toggleInputField();
    toggleInputFieldLanguages();
  });

  $("#minPriceInput").val($("#minPrice").val());
  $("#maxPriceInput").val($("#maxPrice").val());
});

$(document).ready(function () {
  $("#resetButton").click(function () {
    $(".schedule-block").each(function () {
      resetScheduleBlock($(this));
    });
  });

  function resetScheduleBlock($block) {
    $block.find(".dropdownMenuButton").text("Select Days");
    $block.find(".dropdown-menu").hide();

    $block.find(".timeInput").val("");
    $block.find(".ampm-display").val("").addClass("d-none");

    $block.find(".dropdown-menu label").removeClass("selected");
    $block.find(".dropdown-menu span").removeClass("selected");

    $block.find(".remove-location").hide();
  }

  $(".dropdownMenuButton").click(function () {
    const $menu = $(this).next(".dropdown-menu");
    $menu.toggleClass("d-none");
  });

  $(".dropdown-menu label").click(function () {
    const $button = $(this).closest(".dropdown").find(".dropdownMenuButton");
    $button.text($(this).text());

    $(this).addClass("selected");

    $(this).closest(".dropdown-menu").addClass("d-none");
  });

  $(".remove-location").click(function () {
    $(this).closest(".schedule-block").remove();
  });
});

$(document).ready(function () {
  function toggleDropdown() {
    let $dropdownOptions = $("#placeDropdownOptions");
    let isVisible = $dropdownOptions.is(":visible");

    if (isVisible) {
      $dropdownOptions.hide().css("display", "none");
    } else {
      $dropdownOptions.show().css("display", "block");
    }

    $("#placeDropdown").toggleClass("open", !isVisible);
    $(".dropdown-arrow").toggleClass("rotate-180", !isVisible);
  }

  $("#placeDropdown").click(function () {
    toggleDropdown();
  });

  $(".dropdown-option").click(function () {
    let selectedValue = $(this).text();
    $("#placeDropdown span:first").text(selectedValue);

    $("#placeDropdownOptions").hide().css("display", "none");
    $("#placeDropdown").removeClass("open");
    $(".dropdown-arrow").removeClass("rotate-180");
  });

  $(document).click(function (e) {
    if (!$(e.target).closest("#placeDropdown, #placeDropdownOptions").length) {
      $("#placeDropdownOptions").hide().css("display", "none");
      $("#placeDropdown").removeClass("open");
      $(".dropdown-arrow").removeClass("rotate-180");
    }
  });

  $("#resetButton").click(function () {
    $("#placeDropdown span:first").text("Select value");

    $("#placeDropdownOptions").hide().css("display", "none");
    $("#placeDropdown").removeClass("open");
    $(".dropdown-arrow").removeClass("rotate-180");

    $("#placeDropdown")
      .off("click")
      .on("click", function () {
        toggleDropdown();
      });
  });
});

// PAGE SAVE/RELOAD
$(document).ready(function () {
  $("#saveButton").click(function () {
    let selectedTags = [];
    $("#selectedTags .tag").each(function () {
      selectedTags.push($(this).text().trim());
    });

    let selectedDays = [];
    $("#selectedDays .tag").each(function () {
      selectedDays.push($(this).text().trim());
    });

    let selectedLanguages = [];
    $("#selectedLanguages .tag").each(function () {
      selectedLanguages.push($(this).text().trim());
    });

    let selectedPlace = $("#placeDropdown span:first").text().trim();
  });

  function addTag(value) {
    var tagHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeTag(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedTags").append(tagHtml);
  }

  function addDay(value) {
    var dayHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeDay(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedDays").append(dayHtml);
  }

  function addLanguage(value) {
    var languageHtml =
      '<span class="tag">' +
      value +
      ' <i class="bi bi-x mt-1" onclick="removeLanguage(this, \'' +
      value +
      "')\"></i></span>";
    $("#selectedLanguages").append(languageHtml);
  }

  window.removeTag = function (element, value) {
    $(element).parent().remove();
    toggleInputField();
  };

  window.removeDay = function (element, value) {
    $(element).parent().remove();
  };

  window.removeLanguage = function (element, value) {
    $(element).parent().remove();
    toggleInputFieldLanguages();
  };

  function toggleInputField() {
    if ($("#selectedTags .tag").length > 0) {
      $("#inputField").hide();
    } else {
      $("#inputField").show();
    }
  }

  function toggleInputFieldLanguages() {
    if ($("#selectedLanguages .tag").length > 0) {
      $("#inputFieldLanguages").hide();
    } else {
      $("#inputFieldLanguages").show();
    }
  }
});

$(document).ready(function () {
  $(".form-check-input").change(function () {
    var label = $(this).closest(".form-check").find("label");
    var icon = $(this).closest(".form-check").find("i");

    if ($(this).prop("checked")) {
      label.css("color", "#6750f9");
      icon.css("color", "#6750f9");
      label.closest(".form-check").css("border-color", "#6750f9");
    } else {
      label.css("color", "");
      icon.css("color", "");
      label.closest(".form-check").css("border-color", "");
    }
  });

  $("#inputFieldLanguages").hide();
  $("#inputField").hide();
});

$(document).ready(function () {
  $("#minPriceInput, #maxPriceInput").on("input", function () {});
  $("#saveButton").click(function () {});
});

$(document).ready(function () {
  $("#minPrice, #maxPrice").on("input", function () {
    updatePriceTooltip($("#minPrice"), $(".price-tooltip:first"));
    updatePriceTooltip($("#maxPrice"), $(".price-tooltip:last"));
    updateProgressBar();
  });

  function updatePriceTooltip(slider, tooltip) {
    var value = slider.val();
    var percentage =
      ((value - slider.attr("min")) /
        (slider.attr("max") - slider.attr("min"))) *
      100;
    tooltip.css("left", "calc(" + percentage + "% - 15px)");
    tooltip.text(value + "$");
  }

  function updateProgressBar() {
    var minValue = $("#minPrice").val();
    var maxValue = $("#maxPrice").val();
    var minPercentage =
      ((minValue - $("#minPrice").attr("min")) /
        ($("#minPrice").attr("max") - $("#minPrice").attr("min"))) *
      100;
    var maxPercentage =
      ((maxValue - $("#maxPrice").attr("min")) /
        ($("#maxPrice").attr("max") - $("#maxPrice").attr("min"))) *
      100;

    $(".progress-bar").css("left", minPercentage + "%");
    $(".progress-bar").css("right", 100 - maxPercentage + "%");
  }

  loadSliderState();
});

$(document).ready(function () {
  $(".remove-location").click(function () {
    $(this).closest(".schedule-block").remove();
  });
});

//RESET TOAST DATA
document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.getElementById("resetButton");
  const resetToast = document.getElementById("resetToast");

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

  resetButton.addEventListener("click", function () {
    showToast(resetToast);
  });

  saveButton.addEventListener("click", function () {
    showToast(saveToast);
  });
});
