import { Fragment } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../redux/stateTypes';
import Board from './Board/Board';
import Navigation from './Navigation/Navigation';
import SideMenu from './SideMenu/containers/SideMenu';
import AddScheduleDialog from './AddScheduleDialog/containers/AddScheduleDialog';
import ShowScheduleDialog from './ShowScheduleDialog/containers/ShowScheduleDialog';
import UpdateScheduleDialog from './UpdateScheduleDialog/containers/UpdateScheduleDialog';


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
        </Fragment>
    );
};


export default Calendar;

