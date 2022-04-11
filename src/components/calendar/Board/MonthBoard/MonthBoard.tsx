import React, { useEffect } from 'react';
import { Schedule, CalendarState } from '../../../../redux/stateTypes';
import { CalendarDate } from '../../../../redux/selectors';
import WeekHeader from './parts/WeekHeader';
import Dates from './parts/Dates';
import BaseBoard from '../base/containers/BaseBoard';


export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    dates: CalendarDate[];
}

export type DispatchProps = {
    openAddDialog: (date: Schedule['date']) => void;
    fetchSchedules: (year: number, month: number) => void;
    fetchHolidays: (year: number, month: number) => void;
}

export type MonthBoardProps = StateProps & DispatchProps & {
    fetchSchedules: () => void;
    fetchHolidays: () => void;
}

const MonthBoard: React.FC<MonthBoardProps> = ({ month, dates, openAddDialog, fetchHolidays, fetchSchedules }) => {
    useEffect(() => {
        fetchSchedules();
        fetchHolidays();
    }, []);
    return (
        <BaseBoard>
            {WeekHeader()}
            {Dates(dates, openAddDialog, month)}
        </BaseBoard>
    );
}

export default MonthBoard;
