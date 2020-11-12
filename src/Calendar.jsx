import React from 'react';
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
            console.log(date.toString());
            return (holiday.name);
        }
    }
}

export default function ReactCalendar() {

    return (
        <React.Fragment>
            <Title>Calendar</Title>
            <ResponsiveContainer>
                <Calendar
                    tileContent={({ date, view }) => view === 'month' && traverseHolidays(date) ? <Typography>{traverseHolidays(date)}</Typography> : null}
                    tileDisabled={({ date }) => date.getDay() === 0}
                ></Calendar>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
