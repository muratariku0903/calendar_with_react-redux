import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { Dayjs } from 'dayjs';
import WeekHeader from './WeekHeader';
import Date from './Date';
import { Schedule } from '../../../redux/stateTypes';


const useStyles = makeStyles(() => {
    return createStyles({
        grid: {
            borderLeft: '1px solid #ccc',
            borderTop: '1px solid #ccc',
        },
    });
});

type BoardProps = {
    month: number,
    dates: { date: Dayjs, dateSchedules: Schedule[] }[],
    schedules: Record<string, Schedule[]>,
    openAddDialog: (date: Dayjs) => void,
    openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => void,
}

const Board: React.FC<BoardProps> = (props) => {
    const classes = useStyles();
    return (
        <div>
            <WeekHeader />
            <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                {props.dates.map((val, idx) => {
                    return (
                        <li key={idx} onClick={() => props.openAddDialog(val.date)}>
                            <Date date={val.date} schedules={val.dateSchedules} currentMonth={props.month} openShowDialog={props.openShowDialog} />
                        </li>
                    );
                })}
            </GridList>
        </div>
    );
}

export default Board;
