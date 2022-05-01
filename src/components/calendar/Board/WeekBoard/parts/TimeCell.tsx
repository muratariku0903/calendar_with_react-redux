import React from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { makeStyles, createStyles } from '@material-ui/core';
import { State, Schedule, SnackBarState } from '../../../../../redux/stateTypes';
import ScheduleLabel from './ScheduleLabel';
import { DndItems } from '../../dnd/constants';
import { cellHeight } from '../constants';
import { getSchedulesByDate, createSchedulesKey } from '../../../../../services/schedules';
import { ScheduleValidation } from '../../../../../services/Validation/scheduleValidation';
import { rules } from '../../../validationRules';
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
    openSnackBar: (errorMessage: SnackBarState['message']) => void;
}

export type OutterProps = {
    timeItem: TimeItem;
}

type TimeCellProps = DispatchProps & OutterProps;

const TimeCell: React.FC<TimeCellProps> = ({ timeItem, updateSchedule, openAddDialog, openSnackBar }) => {
    const monthSchedules = useSelector((state: State) => state.schedules.monthSchedules);
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
            const key = createSchedulesKey(date.unix());
            console.log(key);
            const dateSchedules = getSchedulesByDate(monthSchedules, key);
            console.log(dateSchedules);
            const validation = new ScheduleValidation(rules);
            const validationMessage = validation.validateTimeConflict('予定の時間', newSchedule.time, dateSchedules);
            if (!validationMessage) {
                updateSchedule(schedule.date, newSchedule);
            } else {
                openSnackBar(validationMessage);
            }
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
