import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Schedule } from '../../../../../redux/stateTypes';
import dayjs from 'dayjs';


type ScheduleTitleProps = Pick<Schedule, 'title' | 'date'>;

const ScheduleTitle: React.FC<ScheduleTitleProps> = ({ title, date }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item xs={10}>
                <Typography variant="h5" component="h2">{title}</Typography>
                <Typography color='textSecondary'>{dayjs.unix(date).format('M月D日')}</Typography>
            </Grid>
        </Grid>
    );
}

export default ScheduleTitle;
