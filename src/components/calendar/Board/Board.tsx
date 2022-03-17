import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { CalendarDate } from '../../../redux/selectors';
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
    dates: CalendarDate[];
}

export type DispatchProps = {
    openAddDialog: (date: Dayjs) => void;
    fetchSchedules: (year: number, month: number) => void;
    fetchHolidays: (year: number, month: number) => void;
}

export type BoardProps = StateProps & DispatchProps & {
    fetchSchedules: () => void;
    fetchHolidays: () => void;
}

const Board: React.FC<BoardProps> = ({ month, dates, openAddDialog, fetchHolidays, fetchSchedules }) => {
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
                            <Date date={val.date} dateSchedules={val.dateSchedules} holiday={val.holiday} month={month} />
                        </li>
                    );
                })}
            </GridList>
        </div>
    );
}

export default Board;
