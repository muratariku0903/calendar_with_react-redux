import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Schedule } from '../../../../../redux/stateTypes';
import BaseScheduleLabel from '../../base/containers/BaseScheduleLabel';
import { breakpoints } from '../../../../../constants';

type ScheduleStyleProps = {
    width: string;
}

const useStyles = makeStyles(() => {
    return createStyles({
        schedule: {
            width: (props: ScheduleStyleProps) => props.width,
            height: '23px',
            margin: '1px 0',
            padding: '1px 4px',
            backgroundColor: 'rgb(121, 134, 203)',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            overflow: 'hidden',
            lineHeight: '23px',
        }
    });
});

export type OutterProps = {
    schedule: Schedule;
}

export type ScheduleLabelProps = OutterProps;

const ScheduleLabel: React.FC<ScheduleLabelProps> = ({ schedule }) => {
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);
    const classes = useStyles({ width: isSizeXS ? '75%' : '90%' });

    return (
        <BaseScheduleLabel schedule={schedule} classes={classes}>
            {schedule.title}
        </BaseScheduleLabel>
    );
}

export default ScheduleLabel;
