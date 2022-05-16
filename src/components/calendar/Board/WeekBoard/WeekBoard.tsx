import React from 'react';
import { useSelector } from 'react-redux';
import { useGetWeekDates } from '../../../../hooks/calendar';
import { Grid } from '@material-ui/core';
import { State } from '../../../../redux/stateTypes';
import BaseBoard from '../base/containers/BaseBoard';
import SideTimeLabels from './parts/SideTimeLabels';
import WeekHeader from './parts//WeekHeader';
import DateHeader from './parts/DateHeader';
import HolidayHeader from './parts/HolidayHeader';
import TimeTable from './containers/TimeTable';
import { weeks } from '../../../../constants';
import { useGetWeekHolidays } from '../../../../hooks/holidays';


type WeekBoardProps = {};

const WeekBoard: React.FC<WeekBoardProps> = () => {
    const { year, month, firstDateOfWeek } = useSelector((state: State) => state.calendar);
    const weekHolidays = useGetWeekHolidays(year, month, firstDateOfWeek);
    const weekDates = useGetWeekDates(year, month, firstDateOfWeek);

    return (
        <BaseBoard>
            <Grid container>
                <Grid item xs={1}>
                    <SideTimeLabels />
                </Grid>
                <Grid item xs={11}>
                    <WeekHeader weeks={weeks} />
                    <DateHeader dates={weekDates} />
                    <HolidayHeader holidays={weekHolidays} />
                    <TimeTable dates={weekDates} />
                </Grid>
            </Grid>
        </BaseBoard>
    );
}

export default WeekBoard;
