import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { State } from '../../redux/stateTypes';
import Navigation from './Navigation/containers/Navigation';
import Profile from './Profile/containers/Profile';
import UpdateUserDialog from './UpdateUserDialog/containers/UpdateUserDialog';



const Search: React.FC = () => {
    const { isLogin } = useSelector((state: State) => state.user);

    if (!isLogin) return <Navigate to='/login' />;

    return (
        <div>検索結果</div>
    );
};


export default Search;

