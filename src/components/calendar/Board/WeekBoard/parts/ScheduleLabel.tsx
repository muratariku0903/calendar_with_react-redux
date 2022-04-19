import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Schedule } from '../../../../../redux/stateTypes';
import BaseScheduleLabel from '../../base/containers/BaseScheduleLabel';
import dayjs from 'dayjs';

type Props = {
    height: string;
};

const useStyles = makeStyles(() => {
    return createStyles({
        schedule: {
            position: 'absolute',
            width: '90%',
            height: (props: Props) => props.height,
            backgroundColor: 'rgb(121, 134, 203)',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            padding: '1px 4px',
            margin: '1px 0',
            cursor: 'pointer',
            zIndex: 10,
        },
    });
});

export type OutterProps = {
    schedule: Schedule;
}

export type ScheduleLabelProps = OutterProps;

const ScheduleLabel: React.FC<ScheduleLabelProps> = ({ schedule }) => {
    const { start, end } = schedule.time;
    const startTime = `${dayjs.unix(start).hour()}:${String(dayjs.unix(start).minute()).padStart(2, '0')}`;
    const endTime = `${dayjs.unix(end).hour()}:${String(dayjs.unix(end).minute()).padStart(2, '0')}`;
    const height = `${Math.floor(((end - start) / 60 / 30)) * 3.5}vh`;
    const classes = useStyles({ height: height });

    return (
        <BaseScheduleLabel schedule={schedule} classes={classes}>
            <div>{schedule.title}</div>
            <div>{startTime}~{endTime}</div>
        </BaseScheduleLabel>
    );
}

export default ScheduleLabel;
