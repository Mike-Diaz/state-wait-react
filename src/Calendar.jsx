import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveContainer } from 'recharts';
import Title from './Title.jsx';
import Calendar from 'react-calendar';
import {allFederalHolidaysForYear} from './federalHolidays';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';

const federalHolidaysForYear = () => {
    let allFedHolidays = allFederalHolidaysForYear();

    //console.log(allFedHolidays);

    return allFedHolidays;
}

federalHolidaysForYear();


export default function ReactCalendar() {
    const theme = useTheme();

    let nowDate = new Date();

    const [date, setDate] = useState(nowDate)
    let [currentHoliday, setCurrentHoliday] = useState(federalHolidaysForYear()[nowDate.getMonth() - 1].date);

    function handleOnClickMonth(){
        setCurrentHoliday = (federalHolidaysForYear()[nowDate.getMonth() - 1].date);
    }
    
    return (
        <React.Fragment>
            <Title>Calendar</Title>
            <ResponsiveContainer>
                <Calendar
                    value={currentHoliday}
                    // onClickDay={handleOnClickDay}
                    onClickMonth={handleOnClickMonth()}
                    // onClickDay={handleOnClickDay()} TODO: Create func using fed holidays to calculate 10 business days
                    onViewChange={({activeStartDate, view}) => alert('New view is: ', view)}
                ></Calendar>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
