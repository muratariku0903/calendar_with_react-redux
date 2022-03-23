import React from 'react';
import { useDrag } from 'react-dnd';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Schedule } from '../../../redux/stateTypes';
import { DndItems } from '../Board/dnd/constants';

const useStyles = makeStyles(() => {
    return createStyles({
        schedule: {
            width: '90%',
            backgroundColor: 'rgb(121, 134, 203)',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            padding: '1px 4px',
            margin: '1px 0',
            cursor: 'pointer',
        }
    });
});

export type OutterProps = {
    schedule: Schedule;
}

export type DispatchProps = {
    openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => void;
}

export type ScheduleLabelProps = DispatchProps & OutterProps;

const ScheduleLabel: React.FC<ScheduleLabelProps> = ({ schedule, openShowDialog }) => {
    const classes = useStyles();
    const [collected, drag] = useDrag(() => ({
        type: DndItems.Schedule,
        item: schedule,
    }));

    return (
        <div
            ref={drag}
            onClick={e => openShowDialog(e, schedule)}
            className={classes.schedule}
        >
            {schedule.title}
        </div>
    );
}

export default ScheduleLabel;
