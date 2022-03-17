import React, { Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { CalendarDate } from '../../../redux/selectors';
import ScheduleLabel from './containers/ScheduleLabel';
import HolidayLabel from './HolidayLabel';
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
        },
        schedules: {
            overflow: 'scroll',
            height: 'calc(18vh - 40px)',
        },
    });
});


type DateProps = CalendarDate & { month: number; }

const Date: React.FC<DateProps> = ({ date, dateSchedules, holiday, month }) => {
    const classes = useStyles();
    const today = dayjs();
    const isCurrentMonth = date.month() + 1 === month;
    const isToday = isSameDay(today, date);
    const textColor = isCurrentMonth ? 'textPrimary' : 'textSecondary';
    const format = isFirstDay(date) ? "M月D日" : "D";

    return (
        <Fragment>
            <div className={classes.element}>
                <Typography align="center" component="div" variant="caption" color={textColor}>
                    <span className={isToday ? classes.today : ''}>{date.format(format)}</span>
                </Typography>
                <div className={classes.schedules}>
                    {dateSchedules.map((schedule, idx) => {
                        return <ScheduleLabel key={idx} schedule={schedule} />;
                    })}
                    {holiday && (<HolidayLabel name={holiday.name} />)}
                </div>
            </div>
        </Fragment>
    );
}

export default Date;
