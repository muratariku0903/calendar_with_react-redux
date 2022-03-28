import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../redux/stateTypes';
import Navigation from './Navigation/containers/Navigation';
import Profile from './Profile/containers/Profile';
import UpdateUserDialog from './UpdateUserDialog/containers/UpdateUserDialog';



const User: React.FC = () => {
    const { isLogin } = useSelector<State>(state => state.user) as State['user'];

    if (!isLogin) return <Navigate to='/login' />;

    return (
        <Fragment>
            <Navigation />
            <Profile />
            <UpdateUserDialog />
        </Fragment>
    );
};


export default User;

