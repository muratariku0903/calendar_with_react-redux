import React from 'react';
import { Grid } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import { AccessTime } from "@material-ui/icons";
import { DialogSchedule } from '../../../../redux/stateTypes';
import dayjs, { Dayjs } from 'dayjs';

type AddScheduleDialogTimeProps = {
    time: DialogSchedule['time'];
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialogTime: React.FC<AddScheduleDialogTimeProps> = ({ time, setDialogForm }) => {
    const startDate = time.start ? dayjs.unix(time.start) : null;
    const endDate = time.end ? dayjs.unix(time.end) : null;
    const setTime = (d: Dayjs | null, flag: 'start' | 'end') => {
        if (flag === 'start') {
            setDialogForm({ time: { ...time, start: d ? d.unix() : null } });
        } else if (flag === 'end') {
            setDialogForm({ time: { ...time, end: d ? d.unix() : null } });
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
                        <TimePicker label="開始" value={startDate} onChange={d => setTime(d, 'start')} />
                    </Grid>
                    <Grid item xs={5}>
                        <TimePicker label="終了" value={endDate} onChange={d => setTime(d, 'end')} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AddScheduleDialogTime;
