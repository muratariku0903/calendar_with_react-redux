import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { isFirstDay, isSameDay } from '../../../services/calendar';

const useStyles = makeStyles(() => {
    return createStyles({
        element: {
            borderRight: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            height: '18vh',
        },
        today: {
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '50%',
            width: '40',
            height: '40',
        }
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
    const isToday = isSameDay(today, props.date);
    const textColor = isCurrentMonth ? 'textPrimary' : 'textSecondary';
    const format = isFirstDay(props.date) ? "M月D日" : "D";

    return (
        <Typography className={classes.element} align="center" component="div" variant="caption" color={textColor}>
            <span className={isToday ? classes.today : ''}>{props.date.format(format)}</span>
        </Typography>
    );
}

export default Date;
