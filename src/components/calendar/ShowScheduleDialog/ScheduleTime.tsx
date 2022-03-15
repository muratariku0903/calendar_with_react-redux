import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AccessTimeOutlined } from "@material-ui/icons";
import { ScheduleTime as ScheduleTimeType } from '../../../redux/stateTypes';
import dayjs from 'dayjs';


type ScheduleTimeProps = {
    start: number | null;
    end: number | null;
}

const ScheduleTime: React.FC<ScheduleTimeProps> = ({ start, end }) => {
    console.log(dayjs.unix(start ? start : 1));
    const startTime = start ? `${String(dayjs.unix(start).hour())}:${String(dayjs.unix(start).minute()).padStart(2, '0')}` : null;
    const endTime = end ? `${String(dayjs.unix(end).hour())}:${String(dayjs.unix(end).minute()).padStart(2, '0')}` : null;
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <AccessTimeOutlined />
            </Grid>
            <Grid container xs={10}>
                <Grid item xs={3}>
                    <Typography>{startTime ? startTime : '未設定'}</Typography>
                </Grid>
                <Grid item xs={3}>
                    ~
                </Grid>
                <Grid item xs={3}>
                    <Typography>{endTime ? endTime : '未設定'}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ScheduleTime;
