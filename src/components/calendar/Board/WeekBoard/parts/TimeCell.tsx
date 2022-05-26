import React from 'react';
import { useDrop } from 'react-dnd';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Schedule } from '../../../../../redux/stateTypes';
import ScheduleLabel from './ScheduleLabel';
import { DndItems } from '../../dnd/constants';
import { cellHeight } from '../constants';

type TimeCellStyleProps = {
    borderTop: string;
    backgroundColor: string;
}

const useStyles = makeStyles(() => {
    return createStyles({
        gridCell: {
            position: 'relative',
            height: cellHeight('quarter'),
            borderTop: (props: TimeCellStyleProps) => props.borderTop,
            borderRight: '1px solid #ccc',
            textAlign: 'center',
            backgroundColor: (props: TimeCellStyleProps) => props.backgroundColor,
        },
    });
});

type OutterProps = {
    dayOfTheWeek: number;
    time: { hour: number, minute: number };
    schedule: Schedule | null;
    openAddDialog: (dayOfTheWeek: number, startHour: number, startMinute: number) => void;
    updateSchedule: (schedule: Schedule, droppedCellDayOfTheWeek: number, droppedCellStartHour: number, droppedCellStartMinute: number) => void;
}

type TimeCellProps = OutterProps;


const TimeCell: React.FC<TimeCellProps> = React.memo(({ dayOfTheWeek, time, schedule, openAddDialog, updateSchedule }) => {
    const [collected, drop] = useDrop(() => ({
        accept: DndItems.Schedule,
        drop: (droppedSchedule: Schedule) => {
            updateSchedule(droppedSchedule, dayOfTheWeek, time.hour, time.minute);
        },
        collect: (monitor) => {
            return {
                schedule: monitor.getItem(),
                isHovered: monitor.isOver()
            }
        },
    }), [dayOfTheWeek, time]);

    const classes = useStyles({
        borderTop: time.minute == 0 ? '1px solid #ccc' : 'none',
        backgroundColor: collected.isHovered ? 'gray' : 'white',
    });


    return (
        <div
            ref={drop}
            className={classes.gridCell}
            onClick={() => openAddDialog(dayOfTheWeek, time.hour, time.minute)}
        >
            {schedule && (<ScheduleLabel schedule={schedule} />)}
        </div>
    );
});

export default TimeCell;
