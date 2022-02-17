import React from 'react';
import { State } from '../../../redux/types';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { isFirstDay, isSameMonth } from '../../../services/calendar';

const useStyles = makeStyles(() => {
    return createStyles({
        element: {
            borderRight: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            height: '18vh',
        },
    });
});


type DateProps = {
    date: Dayjs;
    currentMonth: number;
}

const Date: React.FC<DateProps> = (props) => {
    const classes = useStyles();
    const today = dayjs();
    const isCurrentMonth = props.date.month() === props.currentMonth;
    const textColor = isCurrentMonth ? 'textPrimary' : 'textSecondary';
    const format = isFirstDay(props.date) ? "M月D日" : "D";

    return (
        <Typography className={classes.element} align="center" component="div" variant="caption" color={textColor}>
            <span>{props.date.format(format)}</span>
        </Typography>
    );
}

const mapStateToProps = (state: State) => {
    return {
        currentMonth: state.calendar.month,
    };
}

export default connect(mapStateToProps)(Date);
