import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import { CalendarState } from '../../../../redux/stateTypes';
import { CalendarDate } from '../../../../redux/selectors';
import BaseBoard from '../base/containers/BaseBoard';
import WeekHeader from '../base/WeekHeader';
import Dates from './parts/Dates';


const useStyles = makeStyles(() => {
    return createStyles({
        grid: {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        },
    });
});

export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    dates: CalendarDate[];
}

export type DispatchProps = {
    fetchSchedules: (year: number, month: number) => void;
    fetchHolidays: (year: number, month: number) => void;
}

export type MonthBoardProps = StateProps & DispatchProps & {
    fetchSchedules: () => void;
    fetchHolidays: () => void;
}

const MonthBoard: React.FC<MonthBoardProps> = ({ dates, fetchHolidays, fetchSchedules }) => {
    const classes = useStyles();
    useEffect(() => {
        fetchSchedules();
        fetchHolidays();
    }, []);
    return (
        <BaseBoard>
            <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                {WeekHeader()}
                {Dates(dates)}
            </GridList>
        </BaseBoard>
    );
}

export default MonthBoard;
