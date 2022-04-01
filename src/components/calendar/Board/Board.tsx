import React from 'react';
import { useSelector } from 'react-redux';
import { State, CalendarState } from '../../../redux/stateTypes';
import MonthBoard from './MonthBoard/containers/MonthBoard';


const Board: React.FC = () => {
    const boardType = useSelector<State>(state => state.calendar.type) as CalendarState['type'];
    switch (boardType) {
        case 'month':
            return <MonthBoard />;

        case 'week':
            return <div>week</div>;
    }
}

export default Board;
