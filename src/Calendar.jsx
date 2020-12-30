import React, { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import Title from './Title.jsx';
import Typography from '@material-ui/core/Typography';
import Calendar from 'react-calendar';
import { allFederalHolidaysForYear } from './federalHolidays';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';

const highlightHolidays = (pVisibleMonth) => {
    let holidaysNew = allFederalHolidaysForYear();

    let visibleMonth = pVisibleMonth;

    let holidayArray = [];

    for (let holiday of holidaysNew) {
        if (holiday.date.getUTCMonth() + 1 === visibleMonth) {
            holidayArray.push(holiday);
        }
        if (holiday.date.getUTCMonth() > visibleMonth) {
            break;
        }
    }

    return holidayArray;
};

const traverseHolidays = (date) => {
    let nowDate = new Date();
    let holidays = highlightHolidays(nowDate.getUTCMonth() + 1);

    for (let holiday of holidays) {
        if (holiday.date.toString() === date.toString()) {
            return (holiday.name);
        }
    }
}

const isHoliday = (view, date) => {
    if ( view === 'month' && traverseHolidays(date)){
        return true;
    } else{
        return false;
    }
}

let tileClassName = ({ date, view }) => {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (isHoliday(view, date)) {
        return 'react-calendar--holiday';
      }
    }
}


let tileContent = ({date, view}) => {
    if(isHoliday(view, date)){
        return (
            <Typography>{traverseHolidays(date)}</Typography>
        );
    } else {
        return null
    }
}




export default function ReactCalendar() {

    let [dateRange, setDateRange] = useState(new Date());


    let calcDateRange = (value) => {
        console.log(new Date(value.getYear(), value.getUTCMonth(), value.getDate() + 10));
        setDateRange([value, new Date(value.getFullYear(), value.getUTCMonth(), value.getDate() + 10)]);
    }

    return (
        <React.Fragment>
            <Title>Calendar</Title>
            <ResponsiveContainer>
                <Calendar
                    value={dateRange}
                    tileContent={tileContent}
                    tileClassName={tileClassName}
                    onChange={calcDateRange}
                />
            </ResponsiveContainer>
        </React.Fragment>
    );
}
