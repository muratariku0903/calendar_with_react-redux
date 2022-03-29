import React from 'react';
import { Grid } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import { AccessTime } from "@material-ui/icons";
import { Schedule } from '../../../../redux/stateTypes';
import dayjs, { Dayjs } from 'dayjs';

type UpdateScheduleDialogDateProps = {
    time: Schedule['time'];
    setUpdateDialog: (scheduleItem: Partial<Schedule>) => void;
}

const UpdateScheduleDialogTime: React.FC<UpdateScheduleDialogDateProps> = ({ time, setUpdateDialog }) => {
    const startTime = time.start ? dayjs.unix(time.start) : null;
    const endTime = time.end ? dayjs.unix(time.end) : null;
    const setTime = (d: Dayjs | null, flag: 'start' | 'end') => {
        if (flag === 'start') {
            setUpdateDialog({ time: { ...time, start: d ? d.unix() : null } });
        } else if (flag === 'end') {
            setUpdateDialog({ time: { ...time, end: d ? d.unix() : null } });
        }
    }

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <AccessTime />
            </Grid>
            <Grid item xs={10}>
                <Grid container>
                    <Grid item xs={5}>
                        <TimePicker label="開始" value={startTime} onChange={d => setTime(d, 'start')} />
                    </Grid>
                    <Grid item xs={5}>
                        <TimePicker label="終了" value={endTime} onChange={d => setTime(d, 'end')} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default UpdateScheduleDialogTime;
