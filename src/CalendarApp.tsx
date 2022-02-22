import { Fragment } from 'react';
import React from 'react';
import Board from './components/calendar/Board/containers/Board';
import Navigation from './components/calendar/Navigation/containers/Navigation';
import AddScheduleDialog from './components/calendar/AddScheduleDialog/containers/AddScheduleDialog';


const CalendarApp: React.FC = () => {
    return (
        <Fragment>
            <Navigation />
            <Board />
            <AddScheduleDialog />
        </Fragment>
    );
};


export default CalendarApp;

