import React from 'react';
import { useSelector } from 'react-redux';
import { State, Schedule } from '../../../../../redux/stateTypes';
import { GridList } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import TimeCol from './TimeCol';
import { createSchedulesKey, getSchedulesByDate } from '../../../../../services/schedules';
import dayjs, { Dayjs } from 'dayjs';

const useStyles = makeStyles(() => {
    return createStyles({
        table: {
            borderRight: '1px solid #ccc',
        }
    });
});

export type DispatchProps = {
    openAddDialog: (dayOfTheWeek: number, startHour: number, startMinute: number) => void;
    updateSchedule: (schedule: Schedule, droppedCellDayOfTheWeek: number, droppedCellStartHour: number, droppedCellStartMinute: number) => void;
}

export type OutterProps = {
    dates: Dayjs[];
}

export type TimeTableProps = DispatchProps & OutterProps;

const TimeTable: React.FC<TimeTableProps> = React.memo(({ dates, openAddDialog, updateSchedule }) => {
    const classes = useStyles();
    const monthSchedules = useSelector((state: State) => state.schedules.monthSchedules);
    const table: JSX.Element[] = [];
    for (const date of dates) {
        const dateKey = createSchedulesKey(date.unix());
        const schedules = getSchedulesByDate(monthSchedules, dateKey);
        const dayOfTheWeek = date.day();
        const dateSchedules: Record<string, Schedule> = {};
        for (const schedule of schedules) {
            const scheduleTimeStart = schedule.time.start;
            const scheduleStartHour = dayjs.unix(scheduleTimeStart).hour();
            const scheduleStartMinute = dayjs.unix(scheduleTimeStart).minute();
            const timeKey = `${scheduleStartHour}:${scheduleStartMinute}`;
            dateSchedules[timeKey] = schedule;
        }

        table.push(
            <TimeCol
                dayOfTheWeek={dayOfTheWeek}
                dateSchedules={dateSchedules}
                openAddDialog={openAddDialog}
                updateSchedule={updateSchedule}
            />
        );
    }


    return (
        <GridList cols={7} spacing={0} cellHeight="auto" className={classes.table}>
            {table}
        </GridList>
    );
});

export default TimeTable;
