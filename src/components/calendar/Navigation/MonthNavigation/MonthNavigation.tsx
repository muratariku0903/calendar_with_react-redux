import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { CalendarState } from '../../../../redux/stateTypes';
import SetMonthNavigation from './parts/SetMonthNavigation';
import BaseNavigation from '../base/containers/BaseNavigation';
import BaseNavigationXS from '../base/BaseNavigationXS';
import { breakpoints } from '../../../../constants';


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
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);

    if (isSizeXS) {
        return (
            <BaseNavigationXS>
                <SetMonthNavigation
                    year={year}
                    month={month}
                    setMonth={setMonth}
                    setPrevMonth={setPrevMonth}
                    setNextMonth={setNextMonth}
                />
            </BaseNavigationXS>
        );
    } else {
        return (
            <BaseNavigation>
                <SetMonthNavigation
                    year={year}
                    month={month}
                    setMonth={setMonth}
                    setPrevMonth={setPrevMonth}
                    setNextMonth={setNextMonth}
                />
            </BaseNavigation>
        );
    }
}

export default MonthNavigation;
