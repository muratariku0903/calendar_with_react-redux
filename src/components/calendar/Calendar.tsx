import { Fragment } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { State } from '../../redux/stateTypes';
import Board from './Board/Board';
import Navigation from './Navigation/Navigation';
import SideMenu from '../app/SideMenu/containers/SideMenu';
import SideMenuXS from '../app/SideMenu/containers/SideMenuXS';
import Dialog from './Dialog/Dialog';
import { breakpoints } from '../../constants';


const Calendar: React.FC = () => {
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`)
    const { isLogin } = useSelector((state: State) => state.user);

    if (!isLogin) return <Navigate to='/login' />;

    return (
        <Fragment>
            <Navigation />
            <Board />
            {isSizeXS ? <SideMenuXS /> : <SideMenu />}
            <Dialog />
        </Fragment>
    );
};


export default Calendar;

