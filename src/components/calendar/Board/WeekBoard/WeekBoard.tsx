import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetWeekDates } from '../../../../hooks/calendar';
import { useComponentDidMount, useComponentWillMount } from '../../../../hooks/lifeCycle';
import { showLoader, hideLoader } from '../../../../redux/actions/app/loader';
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
    const { firstDateOfWeekTimeStamp } = useSelector((state: State) => state.calendar);
    const dispatch = useDispatch();
    const weekHolidays = useGetWeekHolidays(firstDateOfWeekTimeStamp);
    const weekDates = useGetWeekDates(firstDateOfWeekTimeStamp);
    useComponentWillMount(() => dispatch(showLoader()));
    useComponentDidMount(() => dispatch(hideLoader()));

    return (
        <BaseBoard>
            <Grid container>
                <Grid item xs={2} md={1}>
                    <SideTimeLabels />
                </Grid>
                <Grid item xs={10} md={11}>
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
