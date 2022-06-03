import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { CalendarState } from '../../../../redux/stateTypes';
import SetWeekNavigation from './parts/SetWeekNavigation';
import BaseNavigation from '../base/containers/BaseNavigation';
import BaseNavigationXS from '../base/BaseNavigationXS';
import { breakpoints } from '../../../../constants';


export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    firstDateOfWeekTimeStamp: CalendarState['firstDateOfWeekTimeStamp'];
}

export type DispatchProps = {
    setWeek: (year: CalendarState['year'], month: CalendarState['month'], firstDateOfWeekTimeStamp: CalendarState['firstDateOfWeekTimeStamp']) => void;
}

export type WeekNavigationProps = StateProps & DispatchProps & {
    setPrevWeek: () => void;
    setNextWeek: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({ year, month, setPrevWeek, setNextWeek }) => {
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);

    if (isSizeXS) {
        return (
            <BaseNavigationXS>
                <SetWeekNavigation
                    year={year}
                    month={month}
                    setPrevWeek={setPrevWeek}
                    setNextWeek={setNextWeek} />
            </BaseNavigationXS>
        );
    } else {
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
}

export default WeekNavigation;
