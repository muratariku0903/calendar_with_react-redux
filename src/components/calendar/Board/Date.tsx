import React, { Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { isFirstDay, isSameDay } from '../../../services/calendar';
import { Schedule as DateSchedule, Holiday as HolidayType } from '../../../redux/stateTypes';
import Schedule from './Schedule';
import Holiday from './Holiday';

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


type DateProps = {
    date: Dayjs,
    schedules: DateSchedule[],
    holiday: HolidayType;
    currentMonth: number;
    openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: DateSchedule) => void;
}

const Date: React.FC<DateProps> = ({ date, schedules, holiday, currentMonth, openShowDialog }) => {
    const classes = useStyles();
    const today = dayjs();
    const isCurrentMonth = date.month() + 1 === currentMonth;
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
                    {schedules.map((schedule, idx) => {
                        return <Schedule key={idx} schedule={schedule} openShowDialog={openShowDialog} />;
                    })}
                    {holiday && (<Holiday name={holiday.name} />)}
                </div>
            </div>
        </Fragment>
    );
}

export default Date;
