import { Fragment } from 'react';
import React from 'react';
import Board from './components/calendar/Board/containers/Board';
import Navigation from './components/calendar/Navigation/containers/Navigation';
import AddScheduleDialog from './components/calendar/AddScheduleDialog/containers/AddScheduleDialog';
import ShowScheduleDialog from './components/calendar/ShowScheduleDialog/containers/ShowScheduleDialog';
import UpdateScheduleDialog from './components/calendar/UpdateScheduleDialog/containers/UpdateScheduleDialog';


const CalendarApp: React.FC = () => {
    return (
        <Fragment>
            <Navigation />
            <Board />
            <AddScheduleDialog />
            <ShowScheduleDialog />
            <UpdateScheduleDialog />
        </Fragment>
    );
};


export default CalendarApp;

