import React from 'react';
import { useDrop } from 'react-dnd';
import { makeStyles, createStyles } from '@material-ui/core';
import { Schedule } from '../../../../../redux/stateTypes';
import ScheduleLabel from './ScheduleLabel';
import { DndItems } from '../../dnd/constants';
import { cellHeight } from '../constants';
import { Dayjs } from 'dayjs';

type Props = {
    borderTop: string;
    height: string;
    backgroundColor: string;
};

const useStyles = makeStyles(() => {
    return createStyles({
        gridCell: {
            position: 'relative',
            height: (props: Props) => props.height,
            borderTop: (props: Props) => props.borderTop,
            borderRight: '1px solid #ccc',
            textAlign: 'center',
            backgroundColor: (props: Props) => props.backgroundColor,
        },
    });
});

export type TimeItem = {
    date: Dayjs;
    schedule: Schedule | null;
};

export type DispatchProps = {
    openAddDialog: (time: Schedule['time']) => void;
    updateSchedule: (prevDate: Schedule['date'], schedule: Schedule) => void;
}

export type OutterProps = {
    timeItem: TimeItem;
}

type TimeCellProps = DispatchProps & OutterProps;

const TimeCell: React.FC<TimeCellProps> = ({ timeItem, updateSchedule, openAddDialog }) => {
    const { date, schedule } = timeItem;
    const [collected, drop] = useDrop(() => ({
        accept: DndItems.Schedule,
        drop: (schedule: Schedule) => {
            const { start, end } = schedule.time;
            const diff = end - start;
            const newSchedule = {
                ...schedule,
                date: date.unix(),
                time: {
                    start: date.unix(),
                    end: date.unix() + diff,
                }
            }
            updateSchedule(schedule.date, newSchedule);
        },
        collect: (monitor) => ({ schedule: monitor.getItem(), isHovered: monitor.isOver() }),
    }), [date]);
    const classes = useStyles({
        borderTop: date.format('mm') == '00' ? '1px solid #ccc' : 'none',
        height: cellHeight('quarter'),
        backgroundColor: collected.isHovered ? 'gray' : 'white',
    });

    return (
        <div
            ref={drop}
            className={classes.gridCell}
            onClick={() => openAddDialog({ start: date.unix(), end: date.add(1, 'h').unix() })}
        >
            {schedule && (<ScheduleLabel schedule={schedule} />)}
        </div>
    );
}

export default TimeCell;
