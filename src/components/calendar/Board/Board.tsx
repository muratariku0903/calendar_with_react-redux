import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { Schedule, Holiday } from '../../../redux/stateTypes';
import { Dayjs } from 'dayjs';
import WeekHeader from './WeekHeader';
import Date from './Date';


const useStyles = makeStyles(() => {
    return createStyles({
        grid: {
            borderLeft: '1px solid #ccc',
            borderTop: '1px solid #ccc',
        },
    });
});

export type StateProps = {
    year: number;
    month: number;
    dates: { date: Dayjs, dateSchedules: Schedule[], holiday: Holiday }[];
}

export type DispatchProps = {
    openAddDialog: (date: Dayjs) => void;
    openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => void;
    fetchSchedules: (year: number, month: number) => void;
    fetchHolidays: (year: number, month: number) => void;
}

export type BoardProps = StateProps & DispatchProps & {
    fetchSchedules: () => void;
    fetchHolidays: () => void;
}

const Board: React.FC<BoardProps> = ({ month, dates, openAddDialog, openShowDialog, fetchHolidays, fetchSchedules }) => {
    const classes = useStyles();
    useEffect(() => {
        fetchSchedules();
        fetchHolidays();
    }, []);
    return (
        <div>
            <WeekHeader />
            <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                {dates.map((val, idx) => {
                    return (
                        <li key={idx} onClick={() => openAddDialog(val.date)}>
                            <Date date={val.date} schedules={val.dateSchedules} holiday={val.holiday} currentMonth={month} openShowDialog={openShowDialog} />
                        </li>
                    );
                })}
            </GridList>
        </div>
    );
}

export default Board;
