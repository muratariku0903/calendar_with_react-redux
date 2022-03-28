import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendar from './components/calendar/Calendar';
import User from './components/user/User';
import Signup from './components/auth/Signup/containers/Signup';
import Login from './components/auth/Login/containers/Login';


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Calendar />} />
                <Route path='/user' element={<User />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};


export default App;

