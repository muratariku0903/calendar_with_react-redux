import { Fragment } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../redux/stateTypes';
import Board from './Board/Board';
import Navigation from './Navigation/Navigation';
import SideMenu from './SideMenu/containers/SideMenu';
import Dialog from './Dialog/Dialog';


const Calendar: React.FC = () => {
    const { isLogin } = useSelector((state: State) => state.user);

    if (!isLogin) return <Navigate to='/login' />;

    return (
        <Fragment>
            <Navigation />
            <Board />
            <SideMenu />
            <Dialog />
        </Fragment>
    );
};


export default Calendar;

