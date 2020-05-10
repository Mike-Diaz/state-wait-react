// The dates are being pushed wrong. The day is always - 1 than the day pushed.
// Deleted GMT after {year} from all .parse methods since it was pushing one day behind.
// js date ojects are weird.
function getNthDayOf(n, day, month, year) {
    const firstOfMonth = new Date(Date.parse(`${month}/1/${year}`)); // Deleted GMT after {year} from .parse method since it was pushing one day behind.

    let dayOffset = (firstOfMonth.getUTCDay() - day);
    if (dayOffset > 0) {
        dayOffset = 7 - dayOffset;
    } else {
        dayOffset = -dayOffset;
    }
    const initialDay = firstOfMonth.getUTCDate() + dayOffset;

    const finalDay = initialDay + (7 * (n - 1));
    return new Date(Date.parse(`${month}/${finalDay}/${year}`)); // Deleted GMT after {year} from .parse method since it was pushing one day behind.
}

function getLastDayOf(day, month, year) {
    const firstOfDay = getNthDayOf(1, day, month, year).getUTCDate();
    const daysInMonth = (new Date(year, month, 0)).getUTCDate() - 7;

    let lastOfDay = firstOfDay;
    while (lastOfDay <= daysInMonth) {
        lastOfDay += 7;
    }

    return new Date(Date.parse(`${month}/${lastOfDay}/${year}`)); // Deleted GMT after {year} from .parse method since it was pushing one day behind.
}

function allFederalHolidaysForYear(year = (new Date().getUTCFullYear() + 1)) {
    const holidays = [];

    const firstDay = new Date(Date.parse(`1/1/${year}`)); // Deleted GMT after {year} from .parse method since it was pushing one day behind.

    // New Year's Day
    holidays.push({
        name: `New Year's Day`,
        date: new Date(Date.parse(`1/1/${year}`)) // Deleted GMT after {year} from .parse method since it was pushing one day behind.
    });

    // Birthday of Martin Luther King, Jr.
    // Third Monday of January; fun fact: actual birthday is January 15
    holidays.push({
        name: `Birthday of Martin Luther King, Jr.`,
        date: getNthDayOf(3, 1, 1, year)
    });

    // Washington's Birthday
    // Third Monday of February; fun fact: actual birthday is February 22
    // Fun fact 2: officially "Washington's Birthday," not "President's Day"
    holidays.push({
        name: `Washington's Birthday`,
        date: getNthDayOf(3, 1, 2, year)
    });

    // Memorial Day
    // Last Monday of May
    holidays.push({
        name: `Memorial Day`,
        date: getLastDayOf(1, 5, year)
    });

    // Independence Day
    holidays.push({
        name: `Independence Day`,
        date: new Date(Date.parse(`7/4/${year}`)) // Deleted GMT from .parse method since it was pushing one day behind.
    });

    // Labor Day
    // First Monday in September
    holidays.push({
        name: `Labor Day`,
        date: getNthDayOf(1, 1, 9, year)
    });

    // Columbus Day
    // Second Monday in October
    holidays.push({
        name: `Columbus Day`,
        date: getNthDayOf(2, 1, 10, year)
    });

    // Veterans Day
    holidays.push({
        name: `Veterans Day`,
        date: new Date(Date.parse(`11/11/${year}`)) // Deleted GMT after {year} from .parse method since it was pushing one day behind.
    });

    // Thanksgiving Day
    // Fourth Thursday of November
    holidays.push({
        name: `Thanksgiving Day`,
        date: getNthDayOf(4, 4, 11, year)
    });

    // Christmas Day
    holidays.push({
        name: `Christmas Day`,
        date: new Date(Date.parse(`12/25/${year}`)) // Deleted GMT after {year} from .parse method since it was pushing one day behind.
    });

    for (let holiday of holidays) {
        const dow = holiday.date.getUTCDay();

        if (dow == 0) {
            // Actual holiday falls on Sunday.  Shift
            // the observed date forward to Monday.
            holiday.date = new Date(Date.UTC(holiday.date.getUTCFullYear(), holiday.date.getUTCMonth(), holiday.date.getUTCDate() + 1));
            //console.log(holiday.date);
        } else if (dow == 6) {
            // Actual holiday falls on Saturday.  Shift
            // the observed date backward to Friday.
            holiday.date = new Date(Date.UTC(holiday.date.getUTCFullYear(), holiday.date.getUTCMonth(), holiday.date.getUTCDate() - 1));
        }

        holiday.dateString = `${holiday.date.getUTCFullYear()}-${holiday.date.getUTCMonth() + 1}-${holiday.date.getUTCDate()}`;
    }

    return holidays;
}

var number = 0;
for (number = 0; number < 9999; number++) {

}  