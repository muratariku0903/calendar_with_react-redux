import React, { Fragment } from 'react';
import { useDrop } from 'react-dnd';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { Schedule } from '../../../../../redux/stateTypes';
import { CalendarDate } from '../../../../../redux/selectors';
import ScheduleLabel from '../containers/ScheduleLabel';
import HolidayLabel from '../../base/HolidayLabel';
import { isFirstDay, isSameDay } from '../../../../../services/calendar';
import { DndItems } from '../../dnd/constants';

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

export type DispatchProps = {
    updateSchedule: (prevDate: Schedule['date'], schedule: Schedule) => void;
}

// Dateがmonthをoutterで受け取るのはおかしい
type OutterProps = CalendarDate & { month: number; }

type DateProps = DispatchProps & OutterProps;

const Date: React.FC<DateProps> = ({ date, dateSchedules, holiday, month, updateSchedule }) => {
    const classes = useStyles();
    const today = dayjs();
    const isCurrentMonth = date.month() + 1 === month;
    const isToday = isSameDay(today.unix(), date.unix());
    const textColor = isCurrentMonth ? 'textPrimary' : 'textSecondary';
    const format = isFirstDay(date) ? "M月D日" : "D";
    const [collected, drop] = useDrop(() => ({
        accept: DndItems.Schedule,
        drop: (collected: Schedule) => updateSchedule(collected.date, { ...collected, date: date.unix() }),
        collect: (monitor) => ({ schedule: monitor.getItem() }),
    }), [date]);

    return (
        <Fragment>
            <div className={classes.element} >
                <Typography align="center" component="div" variant="caption" color={textColor}>
                    <span className={isToday ? classes.today : ''}>{date.format(format)}</span>
                </Typography>
                <div ref={drop} className={classes.schedules}>
                    {dateSchedules.map((schedule, idx) => {
                        return <ScheduleLabel key={idx} schedule={schedule} />;
                    })}
                    {holiday && (<HolidayLabel name={holiday.name} margin='1px 0' />)}
                </div>
            </div>
        </Fragment>
    );
}

export default Date;
