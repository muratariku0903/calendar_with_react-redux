import React from 'react';
import { useSelector } from 'react-redux';
import { useGetWeekDates } from '../../../../hooks/calendar';
import { Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';
import { State } from '../../../../redux/stateTypes';
import BaseBoard from '../base/containers/BaseBoard';
import SideTimeLabels from './parts/SideTimeLabels';
import WeekHeader from './parts//WeekHeader';
import DateHeader from './parts/DateHeader';
import TimeTable from './containers/TimeTable';
import { weeks } from '../../../../constants';



const useStyles = makeStyles(() => {
    return createStyles({
        grid: {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        },
    });
});

type WeekBoardProps = {};


const WeekBoard: React.FC<WeekBoardProps> = () => {
    const classes = useStyles();
    const { year, month, firstDateOfWeek } = useSelector((state: State) => state.calendar);
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
                    <TimeTable dates={weekDates} />
                </Grid>
            </Grid>
        </BaseBoard>
    );
}

export default WeekBoard;
