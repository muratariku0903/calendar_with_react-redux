import React from 'react';
import { Grid } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import { AccessTime } from "@material-ui/icons";
import { Schedule } from '../../../../../redux/stateTypes';
import dayjs, { Dayjs } from 'dayjs';

type UpdateScheduleDialogDateProps = {
    time: Schedule['time'];
    setUpdateDialog: (scheduleItem: Partial<Schedule>) => void;
}

const UpdateScheduleDialogTime: React.FC<UpdateScheduleDialogDateProps> = ({ time, setUpdateDialog }) => {
    const setTime = (d: Dayjs | null, flag: 'start' | 'end') => {
        if (d) {
            if (flag === 'start') {
                setUpdateDialog({ time: { ...time, start: d.unix() } });
            } else if (flag === 'end') {
                setUpdateDialog({ time: { ...time, end: d.unix() } });
            }
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
                        <TimePicker label="開始" value={dayjs.unix(time.start)} minutesStep={15} onChange={d => setTime(d, 'start')} />
                    </Grid>
                    <Grid item xs={5}>
                        <TimePicker label="終了" value={dayjs.unix(time.end)} minutesStep={15} onChange={d => setTime(d, 'end')} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default UpdateScheduleDialogTime;
