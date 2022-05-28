import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Schedule } from '../../../../../redux/stateTypes';
import BaseScheduleLabel from '../../base/containers/BaseScheduleLabel';
import { breakpoints } from '../../../../../constants';
import dayjs from 'dayjs';

type ScheduleLabelStyleProps = {
    width: string;
    height: string;
};

const useStyles = makeStyles(() => {
    return createStyles({
        schedule: {
            position: 'absolute',
            width: (props: ScheduleLabelStyleProps) => props.width,
            height: (props: ScheduleLabelStyleProps) => props.height,
            margin: '1px 0',
            padding: '1px 4px',
            backgroundColor: 'rgb(121, 134, 203)',
            borderRadius: '4px',
            textAlign: 'left',
            cursor: 'pointer',
            overflow: 'hidden',
            zIndex: 10,
        },
        scheduleTitle: {
            color: '#fff',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        scheduleTime: {
            color: '#fff',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }
    });
});

export type OutterProps = {
    schedule: Schedule;
}

export type ScheduleLabelProps = OutterProps;

const ScheduleLabel: React.FC<ScheduleLabelProps> = ({ schedule }) => {
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);
    const { start, end } = schedule.time;
    const startTime = `${dayjs.unix(start).hour()}:${String(dayjs.unix(start).minute()).padStart(2, '0')}`;
    const endTime = `${dayjs.unix(end).hour()}:${String(dayjs.unix(end).minute()).padStart(2, '0')}`;
    const height = `${Math.floor(((end - start) / 60 / 30)) * 3.5}vh`;
    const classes = useStyles({ height, width: isSizeXS ? '75%' : '90%' });

    return (
        <BaseScheduleLabel schedule={schedule} classes={classes}>
            <div className={classes.scheduleTitle}>{schedule.title}</div>
            <div className={classes.scheduleTime}>{startTime}~{endTime}</div>
        </BaseScheduleLabel >
    );
}

export default ScheduleLabel;
