import React from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { State, Schedule, SnackBarState } from '../../../../../redux/stateTypes';
import { CalendarDate } from '../../../../../redux/selectors';
import ScheduleLabel from './ScheduleLabel';
import HolidayLabel from '../../base/HolidayLabel';
import { DndItems } from '../../dnd/constants';
import { isFirstDay, isSameDay } from '../../../../../services/calendar';
import { getScheduleTimeMergedDate } from '../../../../../services/schedule';
import { getSchedulesByDate, createSchedulesKey } from '../../../../../services/schedules';
import { ScheduleValidation } from '../../../../../services/Validation/scheduleValidation';
import { rules } from '../../../validationRules';
import dayjs from 'dayjs';

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
    openAddDialog: (date: Schedule['date']) => void;
    updateSchedule: (prevDate: Schedule['date'], schedule: Schedule) => void;
    openSnackBar: (errorMessage: SnackBarState['message']) => void;
}

type OutterProps = CalendarDate;

type DateProps = DispatchProps & OutterProps;

const Date: React.FC<DateProps> = ({ date, dateSchedules, holiday, updateSchedule, openAddDialog, openSnackBar }) => {
    const classes = useStyles();
    const month = useSelector((state: State) => state.calendar.month);
    const today = dayjs();
    const isCurrentMonth = date.month() + 1 === month;
    const isToday = isSameDay(today.unix(), date.unix());
    const textColor = isCurrentMonth ? 'textPrimary' : 'textSecondary';
    const format = isFirstDay(date) ? "M月D日" : "D";
    const monthSchedules = useSelector((state: State) => state.schedules.monthSchedules);
    const [collected, drop] = useDrop(() => ({
        accept: DndItems.Schedule,
        drop: (schedule: Schedule) => {
            const key = createSchedulesKey(date.unix());
            const dateSchedules = getSchedulesByDate(monthSchedules, key).filter((dateSchedule) => dateSchedule.id != schedule.id);
            const newScheduleTime = getScheduleTimeMergedDate(date.unix(), schedule.time);
            const validation = new ScheduleValidation(rules);
            const validationMessage = validation.validateTimeConflict('予定の時間', newScheduleTime, dateSchedules);
            if (!validationMessage) {
                updateSchedule(schedule.date, { ...schedule, date: date.unix(), time: newScheduleTime });
            } else {
                openSnackBar(validationMessage);
            }
        },
        collect: (monitor) => ({ schedule: monitor.getItem() }),
    }), [date]);

    return (
        <div className={classes.element} onClick={() => openAddDialog(date.unix())}>
            <Typography align="center" component="div" variant="caption" color={textColor}>
                <span className={isToday ? classes.today : ''}>{date.format(format)}</span>
            </Typography>
            <div ref={drop} className={classes.schedules}>
                {dateSchedules.map((schedule, idx) => <ScheduleLabel key={idx} schedule={schedule} />)}
                {holiday && (<HolidayLabel name={holiday.name} margin='1px 0' />)}
            </div>
        </div>
    );
}

export default Date;
