import React from 'react';
import { CalendarState } from '../../../../redux/stateTypes';
import SetMonthNavigation from './parts/SetMonthNavigation';
import BaseNavigation from '../base/containers/BaseNavigation';


export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
}

export type DispatchProps = {
    setMonth: (year: number, month: number, firstDateOfWeek: number) => void;
}

export type MonthNavigationProps = StateProps & DispatchProps & {
    setPrevMonth: () => void;
    setNextMonth: () => void;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({ year, month, setMonth, setPrevMonth, setNextMonth }) => {
    return (
        <BaseNavigation>
            <SetMonthNavigation year={year} month={month} setMonth={setMonth} setPrevMonth={setPrevMonth} setNextMonth={setNextMonth} />
        </BaseNavigation>
    );
}

export default MonthNavigation;
