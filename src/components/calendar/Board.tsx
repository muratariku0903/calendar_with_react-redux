import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { getCalendarDates, CalendarDate } from '../../redux/selectors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
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
    dates: CalendarDate[]
}

const Board: React.FC<BoardProps> = (props) => {
    const classes = useStyles();
    return (
        <div>
            <WeekHeader />
            <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                {props.dates.map((date, idx) => {
                    return <li key={idx}><Date date={date} /></li>;
                })}
            </GridList>
        </div>
    );
}

const mapStateToProps = (state: State) => {
    return {
        dates: getCalendarDates(state),
    };
}

export default connect(mapStateToProps)(Board);
