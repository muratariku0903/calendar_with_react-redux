import React from 'react';
import { useDrop } from 'react-dnd';
import { makeStyles, createStyles } from '@material-ui/core';
import { Schedule } from '../../../../../redux/stateTypes';
import ScheduleLabel from '../containers/ScheduleLabel';
import { DndItems } from '../../dnd/constants';
import { Dayjs } from 'dayjs';


const useStyles = makeStyles(() => {
    return createStyles({
        gridCell: {
            position: 'relative',
            height: '3.5vh',
            borderTop: '1px solid #ccc',
            borderLeft: '1px solid #ccc',
            textAlign: 'center',
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
    const classes = useStyles();
    const [collected, drop] = useDrop(() => ({
        accept: DndItems.Schedule,
        drop: (collected: Schedule) => {
            const { start, end } = collected.time;
            const diff = end - start;
            const newSchedule = {
                ...collected,
                date: date.unix(),
                time: {
                    start: date.unix(),
                    end: date.unix() + diff,
                }
            }
            updateSchedule(collected.date, newSchedule);
        },
        collect: (monitor) => ({ schedule: monitor.getItem() }),
    }), [date]);

    return (
        <div
            ref={drop}
            className={classes.gridCell}
            onClick={() => openAddDialog({ start: date.unix(), end: date.add(1, 'h').unix() })}
        >
            {schedule ? (<ScheduleLabel schedule={schedule} />) : null}
        </div>
    );
}

export default TimeCell;
