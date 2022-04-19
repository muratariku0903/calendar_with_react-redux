import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Schedule } from '../../../../../redux/stateTypes';
import BaseScheduleLabel from '../../base/containers/BaseScheduleLabel';

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

export type ScheduleLabelProps = OutterProps;

const ScheduleLabel: React.FC<ScheduleLabelProps> = ({ schedule }) => {
    const classes = useStyles();

    return (
        <BaseScheduleLabel schedule={schedule} classes={classes}>
            {schedule.title}
        </BaseScheduleLabel>
    );
}

export default ScheduleLabel;
