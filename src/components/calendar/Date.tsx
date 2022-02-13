import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { CalendarDate } from '../../redux/selectors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
    date: CalendarDate;
    currentDay: number;
}

const Date: React.FC<DateProps> = (props) => {
    const classes = useStyles();
    const textColor = props.date === props.currentDay ? 'textPrimary' : 'textSecondary';

    return (
        <Typography className={classes.element} align="center" component="div" variant="caption" color={textColor}>
            <span>{props.date}</span>
        </Typography>
    );
}

const mapStateToProps = (state: State) => {
    return {
        currentDay: state.calendar.currentDay,
    };
}

export default connect(mapStateToProps)(Date);
