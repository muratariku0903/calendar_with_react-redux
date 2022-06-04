import React from 'react';
import { useSelector } from 'react-redux';
import { State, Schedule } from '../../../../../redux/stateTypes';
import { GridList } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import TimeCol from './TimeCol';
import { createSchedulesKey, getSchedulesByDate, getDateSchedules } from '../../../../../services/schedules';
import { Dayjs } from 'dayjs';

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
        const dateSchedules = getDateSchedules(schedules);
        table.push(
            <TimeCol
                key={dayOfTheWeek}
                dayOfTheWeek={dayOfTheWeek}
                dateSchedules={dateSchedules}
                openAddDialog={openAddDialog}
                updateSchedule={updateSchedule}
            />
        );
    }

    console.log('timetable');

    return (
        <GridList cols={7} spacing={0} cellHeight="auto" className={classes.table}>
            {table}
        </GridList>
    );
});

export default TimeTable;
