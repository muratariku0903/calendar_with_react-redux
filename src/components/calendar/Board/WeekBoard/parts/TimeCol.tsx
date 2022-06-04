import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { GridListTile } from '@material-ui/core';
import { Schedule } from '../../../../../redux/stateTypes';
import TimeCell from './TimeCell';


const useStyles = makeStyles(() => {
    return createStyles({
        timeCol: {
            width: 'calc(100% / 7)',
        },
    });
});

type OutterProps = {
    dayOfTheWeek: number;
    dateSchedules: Record<string, Schedule>;
    openAddDialog: (dayOfTheWeek: number, startHour: number, startMinute: number) => void;
    updateSchedule: (schedule: Schedule, droppedCellDayOfTheWeek: number, droppedCellStartHour: number, droppedCellStartMinute: number) => void;
}

type TimeColProps = OutterProps;


const TimeCol: React.FC<TimeColProps> = React.memo(({ dayOfTheWeek, dateSchedules, openAddDialog, updateSchedule }) => {
    const classes = useStyles();
    const timeCol: JSX.Element[] = [];
    for (let m = 0; m < 1440; m += 15) { // O(96)
        const hour = ~~(m / 60);
        const minute = m % 60;
        const timeKey = `${hour}:${minute}`;
        const schedule = timeKey in dateSchedules ? dateSchedules[timeKey] : null;
        timeCol.push(
            <TimeCell
                key={`${hour}-${minute}`}
                dayOfTheWeek={dayOfTheWeek}
                time={{ hour, minute }}
                schedule={schedule}
                openAddDialog={openAddDialog}
                updateSchedule={updateSchedule}
            />
        );
    }

    return (
        <GridListTile className={classes.timeCol}>
            {timeCol}
        </GridListTile>
    );
});

export default TimeCol;
