// Get the element
var element = document.getElementById("my-calendar");
// Create the calendar
var currentDateElement = new Date();
// Get the current year only
var currentYear = currentDateElement.getUTCFullYear();
// Get the current day only
var dd = currentDateElement.getDate();
// Get the current month only
var mm = currentDateElement.getMonth() + 1;
// Get the current year only (Don't know why there's two..)
var yy = currentDateElement.getUTCFullYear();
// Convert the currentDateString for output
var currentDateString = dd.toString() + "/" + mm + "/" + yy.toString();

// Initializes the calendar itself and provides some parameters for the design and functionality
var myCalendar = jsCalendar.new(element, currentDateString, {
    navigator: true,
    navigatorPosition: "center",
    zeroFill: false,
    monthFormat: "month YYYY",
    dayFormat: "DDD",
    language: "en",
    firstDayOfTheWeek: 1
});

// Get the inputs
var inputA = document.getElementById("my-input-a");

// This will deal with how the calendar highlights the current/selected date.
var isSelected = false;

// Change this in order to calculate different date intervals ie. different states.
var daysToAdd = 10;

// Add events
var today = new Date();
//var fedHolidays = require('us-federal-holidays');
var holidaysNew = allFederalHolidaysForYear(myCalendar._date.getFullYear())
//allFederalHolidaysForYear(myCalendar._date.getFullYear());

// Get the button
var button = document.getElementById("my-button");

// This instantiates a date for months that do not have any holidays. This enables the calculateHoliday method to work and
// avoids skipping any days since the date is invalid. Kinda stupid, but it works.
var currentHoliday = new Date(Date.parse(currentHoliday));

// Highlights the current month's holiday
function highlightHolidays(pVisibleMonth) {
    holidaysNew = allFederalHolidaysForYear(myCalendar._date.getFullYear());

    visibleMonth = pVisibleMonth;
    //myCalendar._date.getMonth() + 1;

    for (let holiday of holidaysNew) {
        if (holiday.date.getMonth() + 1 == visibleMonth) {
            myCalendar.highlight(holiday.date);
            currentHoliday = holiday.date;
            console.log(currentHoliday);
            //break;
        }
        if (holiday.date.getUTCMonth() > visibleMonth) {
            break;
        }
    }
};

// Call the method
highlightHolidays(myCalendar._date.getMonth() + 1);

// Add a button event
button.addEventListener("click", function () {
    myCalendar.set(currentDateString);
    // Reset
    myCalendar.reset();
    // Unselect
    myCalendar.clearselect();
}, false);


// Method decides what the calendar will do on a month change event (arrows are clicked to change month).
myCalendar.onMonthChange(function (event, date) {
    highlightHolidays(myCalendar._date.getMonth() + 1);
});

// Click method which calls the select function to calculate pick up date.
myCalendar.onDateClick(function (event, date) {
    myCalendar.set(date);
    highlightHolidays(myCalendar._date.getMonth() + 2);
    myCalendar.clearselect();
    myCalendar.select(addDates(date, daysToAdd));
    myCalendar.goto(date);
    if (currentDateElement.getMonth() != myCalendar._date.getMonth()) {
        highlightHolidays(myCalendar._date.getMonth() + 1);
        myCalendar.goto(date);
    }

    var selected = myCalendar.getSelected({ sort: "desc", type: "MM-DD-YYYY" }).toString()
    console.log(selected);

    inputA.value = selected;
});

// Method to calculate 10 business days and pick up on 11th. Will skip holidays.
function addDates(startDate, noOfDaysToAdd) {
    var count = 0;
    while (count < noOfDaysToAdd) {
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));
        console.log(myCalendar.isHighlighted(endDate));
        // Skip sundays and current holidays
        // getDay method gets the current day of the week 1-7
        // getDate mthod gets the actual day 1-28/31
        // I cut this code from the if statement in order to run tests currentHoliday.getDate() != endDate.getDate()
        // New case works, checks if the endDate is highlighted and skips that day.
        if (endDate.getDay() != 0 && endDate.getDay() != 6 && myCalendar.isHighlighted(endDate) != true) {
            console.log(endDate.getDate())
            count++;
        }
    }

    // Allows pick up date to include Saturdays
    if (endDate.getDay() != 0) {
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }

    return startDate;
}