import React, { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import Title from './Title.jsx';
import Typography from '@material-ui/core/Typography';
import Calendar from 'react-calendar';
// import fedHolidays from './federalHolidays';
import 'react-calendar/dist/Calendar.css';
import './calendarStyles.css';
import fedHolidays from '@18f/us-federal-holidays';

export default function ReactCalendar() {
    let today = new Date();
    let [dateRange, setDateRange] = useState(today);
    let [pickUpDate, setPickUPDate] = useState('');
    let [holidaysForYear, setHolidaysForYear] = useState(fedHolidays.allForYear(today.getUTCFullYear()));

    let _tileClassName = ({ view, date }) => {
        // Add class to tiles in month view only
        if (view === 'month') {
          // Check if a date React-Calendar wants to check is on the list of dates to add class to
          if (_isHoliday(view, date)) {
            return 'react-calendar--holiday';
          }
        }
    }

    let _tileContent = ({view, date}) => {
        if(_isHoliday(view, date)){
            return (
                <Typography>{_traverseHolidaysForNames(date)}</Typography>
            );
        } else {
            return null
        }
    }

    // TODO: use this function to create a new array of holidays for new year
    //  when year in view is no longer current array year
    
    // let _populateHolidaysForYear = (year) => {
    //     let holidayArray = [];
    
    //     for (let holiday of holidaysForYear) {
    //         if(holiday.date.getUTCFullYear() === year){
    //             holidayArray.push(holiday);
    //         }
    //     }
    
    //     setHolidaysForYear(holidayArray);
    // }
    
    let _traverseHolidaysForNames = (date) => {
        for (let holiday of holidaysForYear) {
            if (holiday.date.toDateString() === date.toDateString()) {
                return (holiday.name);
            }
        }
    }
    
    let _isHoliday = (view, date) => {
        if ( view === 'month' && _traverseHolidaysForNames(date)){
            return true;
        } else{
            return false;
        }
    }

    let _calcDateRange = (value) => {
        let count = 0;
        
        while (count < 11) {
            var endDate = new Date(value.setDate(value.getDate() + 1));
            if (endDate.getDay() !== 0 && endDate.getDay() !== 6 && _isHoliday('month', endDate) !== true) {
                count++;
            }
        }

        setPickUPDate(new Date(value.getFullYear(), value.getUTCMonth(), value.getDate()).toDateString());
        setDateRange([new Date(value.getFullYear(), value.getUTCMonth(), value.getDate())]);
    }

    return (
        <React.Fragment>
            <Title>Calendar</Title>
            <ResponsiveContainer>
                <Calendar
                    calendarType="US"
                    value={dateRange}
                    tileContent={_tileContent}
                    tileClassName={_tileClassName}
                    onChange={_calcDateRange}
                    onViewChange={_tileContent}
                />
            </ResponsiveContainer>
            {pickUpDate ? <Typography>Pick Up Date: {pickUpDate}</Typography> : ''}
        </React.Fragment>
    );
}
