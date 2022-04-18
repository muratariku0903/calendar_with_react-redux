import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/stateTypes';
import MonthBoard from './MonthBoard/containers/MonthBoard';
import WeekBoard from './WeekBoard/containers/WeekBoard';


const Board: React.FC = () => {
    const boardType = useSelector((state: State) => state.calendar.type);
    switch (boardType) {
        case 'month':
            return <MonthBoard />;

        case 'week':
            return <WeekBoard />;
    }
}

export default Board;
