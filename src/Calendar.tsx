import { Fragment } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from './redux/stateTypes';
import Board from './components/calendar/Board/containers/Board';
import Navigation from './components/calendar/Navigation/containers/Navigation';
import SideMenu from './components/calendar/SideMenu/containers/SideMenu';
import AddScheduleDialog from './components/calendar/AddScheduleDialog/containers/AddScheduleDialog';
import ShowScheduleDialog from './components/calendar/ShowScheduleDialog/containers/ShowScheduleDialog';
import UpdateScheduleDialog from './components/calendar/UpdateScheduleDialog/containers/UpdateScheduleDialog';
import ErrorSnackbar from './components/calendar/ErrorSnackbar/containers/ErrorSnackbar';


const Calendar: React.FC = () => {
    const { isLogin } = useSelector<State>(state => state.user) as State['user'];

    if (!isLogin) return <Navigate to='/login' />;

    return (
        <Fragment>
            <Navigation />
            <Board />
            <SideMenu />
            <AddScheduleDialog />
            <ShowScheduleDialog />
            <UpdateScheduleDialog />
            <ErrorSnackbar />
        </Fragment>
    );
};


export default Calendar;

