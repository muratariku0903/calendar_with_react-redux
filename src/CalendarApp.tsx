import { Fragment } from 'react';
import React from 'react';
import Board from './components/calendar/Board/containers/Board';
import Navigation from './components/calendar/Navigation/containers/Navigation';


const CalendarApp: React.FC = () => {
    return (
        <Fragment>
            <Navigation />
            <Board />
        </Fragment>
    );
};


export default CalendarApp;

