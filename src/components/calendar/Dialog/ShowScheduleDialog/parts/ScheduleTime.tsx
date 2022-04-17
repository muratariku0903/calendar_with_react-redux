import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AccessTimeOutlined } from "@material-ui/icons";
import { Schedule } from '../../../../../redux/stateTypes';
import dayjs from 'dayjs';


type ScheduleTimeProps = Pick<Schedule, 'time'>;

const ScheduleTime: React.FC<ScheduleTimeProps> = ({ time: { start, end } }) => {
    const startTime = `${String(dayjs.unix(start).hour())}:${String(dayjs.unix(start).minute()).padStart(2, '0')}`;
    const endTime = `${String(dayjs.unix(end).hour())}:${String(dayjs.unix(end).minute()).padStart(2, '0')}`;
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <AccessTimeOutlined />
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography>{startTime}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        ~
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>{endTime}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ScheduleTime;
