import React from 'react';
import { CalendarDate } from '../../../../redux/selectors';
import BaseBoard from '../base/containers/BaseBoard';
import WeekHeader from './parts/WeekHeader';
import TimeTable from './parts/TImeTable';


export type StateProps = {
    dates: CalendarDate[];
}

export type WeekBoardProps = StateProps;


const WeekBoard: React.FC<WeekBoardProps> = ({ dates }) => {
    return (
        <BaseBoard>
            {WeekHeader()}
            {TimeTable(dates)}
        </BaseBoard>
    );
}

export default WeekBoard;
