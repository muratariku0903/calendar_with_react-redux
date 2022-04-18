import React from 'react';
import { Grid } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import { AccessTime } from "@material-ui/icons";
import { Schedule } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';
import dayjs, { Dayjs } from 'dayjs';

export type StateProps = {
    isStartEdit: boolean;
}

type OutterPros = {
    time: Schedule['time'];
    setDialogForm: (scheduleItem: Partial<Schedule>) => void;
    errorMessage: string;
}

type UpdateScheduleDialogDateProps = StateProps & OutterPros;

const UpdateScheduleDialogTime: React.FC<UpdateScheduleDialogDateProps> = ({ time, isStartEdit, setDialogForm, errorMessage }) => {
    const isError = isStartEdit && Boolean(errorMessage);
    const setTime = (d: Dayjs | null, flag: 'start' | 'end') => {
        if (d) {
            if (flag === 'start') {
                setDialogForm({ time: { ...time, start: d.unix() } });
            } else if (flag === 'end') {
                setDialogForm({ time: { ...time, end: d.unix() } });
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
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default UpdateScheduleDialogTime;
