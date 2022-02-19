import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
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

type BoardProps = {
    month: number,
    dates: Dayjs[],
}

const Board: React.FC<BoardProps> = (props) => {
    const classes = useStyles();
    return (
        <div>
            <WeekHeader />
            <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                {props.dates.map((date, idx) => {
                    return <li key={idx}><Date date={date} currentMonth={props.month} /></li>;
                })}
            </GridList>
        </div>
    );
}

export default Board;
