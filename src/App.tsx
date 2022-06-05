import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendar from './components/calendar/Calendar';
import User from './components/user/User';
import Signup from './components/auth/Signup/containers/Signup';
import Login from './components/auth/Login/containers/Login';
import Search from './components/search/Search';
import SnackBar from './components/app/Snackbar/containers/Snackbar';
import CalendarLoader from './components/app/Loader/containers/Loader';


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Calendar />} />
                <Route path='/search' element={<Search />} />
                <Route path='/user' element={<User />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
            </Routes>
            <SnackBar />
            <CalendarLoader />
        </BrowserRouter>
    );
};


export default App;

