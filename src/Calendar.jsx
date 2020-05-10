import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveContainer } from 'recharts';
import Title from './Title.jsx';
import jsCalendar from './jsCalendar';
import jsCalendarCreator from './jsCalendarCreator';


export default function Calendar() {
    const theme = useTheme();

    useEffect(() => {
        this.el = (this.el);
        this.el.jsCalendarCreator();
    })

    return (
        <React.Fragment>
            <Title>Calendar</Title>
            <ResponsiveContainer>
                <div id="my-calendar" className="classic-theme" ref={el => this.el = el}></div>
            </ResponsiveContainer>
        </React.Fragment>
    );
}