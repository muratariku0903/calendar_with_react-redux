import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { State } from '../../redux/stateTypes';
import Navigation from './Navigation/Navigation';
import NavigationXS from './Navigation/NavigationXS';
import Result from './Result/Result';
import Dialog from '../calendar/Dialog/Dialog';
import SideMenu from '../app/SideMenu/containers/SideMenu';
import SideMenuXS from '../app/SideMenu/containers/SideMenuXS';
import { breakpoints } from '../../constants';


const Search: React.FC = () => {
    const { isLogin } = useSelector((state: State) => state.user);
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);

    if (!isLogin) return <Navigate to='/login' />;

    return (
        <Fragment>
            {isSizeXS ? <NavigationXS /> : <Navigation />}
            <Result />
            <Dialog /> {/* //本来このコンポーネントはappから取り寄せてくるべき */}
            {isSizeXS ? <SideMenuXS /> : <SideMenu />}
        </Fragment>
    );
};


export default Search;

