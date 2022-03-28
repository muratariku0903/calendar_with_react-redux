import { Fragment } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../redux/stateTypes';
import Board from './Board/containers/Board';
import Navigation from './Navigation/containers/Navigation';
import SideMenu from './SideMenu/containers/SideMenu';
import AddScheduleDialog from './AddScheduleDialog/containers/AddScheduleDialog';
import ShowScheduleDialog from './ShowScheduleDialog/containers/ShowScheduleDialog';
import UpdateScheduleDialog from './UpdateScheduleDialog/containers/UpdateScheduleDialog';
import ErrorSnackbar from './ErrorSnackbar/containers/ErrorSnackbar';


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

