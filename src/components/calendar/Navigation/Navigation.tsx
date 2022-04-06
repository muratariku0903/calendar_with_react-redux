import React from 'react';
import { useSelector } from 'react-redux';
import { State, CalendarState } from '../../../redux/stateTypes';
import MonthNavigation from './MonthNavigation/containers/MonthNavigation';
import WeekNavigation from './WeekNavigation/containers/WeekNavigation';


const Navigation: React.FC = () => {
    const boardType = useSelector<State>(state => state.calendar.type) as CalendarState['type'];
    switch (boardType) {
        case 'month':
            return <MonthNavigation />;

        case 'week':
            return <WeekNavigation />;
    }
}

export default Navigation;
