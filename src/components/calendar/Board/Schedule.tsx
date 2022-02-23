import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Schedule as DateSchedule } from '../../../redux/stateTypes';

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

type ScheduleProps = {
    schedule: DateSchedule;
    openShowDialog: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: DateSchedule) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, openShowDialog }) => {
    const classes = useStyles();
    return <div onClick={e => openShowDialog(e, schedule)} className={classes.schedule}>{schedule.title}</div>;
}

export default Schedule;
