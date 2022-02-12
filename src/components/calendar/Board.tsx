import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { getCalendarCells, CalendarCell } from '../../redux/selectors';
import WeekHeader from './WeekHeader';
import Cell from './Cell';
import { createStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => {
    return createStyles({
        calendar: {
            padding: '30px',
        },
    });
});

type BoardProps = {
    cells: CalendarCell[][]
}

const Board: React.FC<BoardProps> = (props) => {
    const classes = useStyles();
    return (
        <table className={classes.calendar}>
            <WeekHeader />
            <tbody>
                {props.cells.map((row, idx_r) => {
                    return <tr key={idx_r}>
                        {row.map((cell, idx_c) => {
                            return <Cell key={idx_c} date={cell} />
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    );
}

const mapStateToProps = (state: State) => {
    return {
        cells: getCalendarCells(state),
    };
}

export default connect(mapStateToProps)(Board);
