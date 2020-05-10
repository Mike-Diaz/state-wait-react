import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveContainer } from 'recharts';
import Title from './Title.jsx';

export default function Calendar() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Calendar</Title>
            <ResponsiveContainer>
                <div id="my-calendar" className="classic-theme"></div>
            </ResponsiveContainer>
        </React.Fragment>
    );
}