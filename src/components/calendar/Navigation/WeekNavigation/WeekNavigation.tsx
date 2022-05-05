import React from 'react';
import { CalendarState } from '../../../../redux/stateTypes';
import SetWeekNavigation from './parts/SetWeekNavigation';
import BaseNavigation from '../base/containers/BaseNavigation';


export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    firstDateOfWeek: CalendarState['firstDateOfWeek'];
}

export type DispatchProps = {
    setWeek: (year: CalendarState['year'], month: CalendarState['month'], firstDateOfWeek: CalendarState['firstDateOfWeek']) => void;
}

export type WeekNavigationProps = StateProps & DispatchProps & {
    setPrevWeek: () => void;
    setNextWeek: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({ year, month, setPrevWeek, setNextWeek }) => {
    return (
        <BaseNavigation>
            <SetWeekNavigation
                year={year}
                month={month}
                setPrevWeek={setPrevWeek}
                setNextWeek={setNextWeek} />
        </BaseNavigation>
    );
}

export default WeekNavigation;
