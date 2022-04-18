import React from 'react';
import { Grid } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import { AccessTime } from "@material-ui/icons";
import { DialogSchedule } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';
import dayjs, { Dayjs } from 'dayjs';

export type StateProps = {
    isStartEdit: boolean;
}

type OutterProps = {
    time: DialogSchedule['time'];
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
    errorMessage: string;
}

type AddScheduleDialogTimeProps = StateProps & OutterProps;

const AddScheduleDialogTime: React.FC<AddScheduleDialogTimeProps> = ({ time, isStartEdit, setDialogForm, errorMessage }) => {
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
                        <TimePicker label="開始" value={dayjs.unix(time.start)} onChange={d => setTime(d, 'start')} minutesStep={15} />
                    </Grid>
                    <Grid item xs={5}>
                        <TimePicker label="終了" value={dayjs.unix(time.end)} onChange={d => setTime(d, 'end')} minutesStep={15} />
                    </Grid>
                </Grid>
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default AddScheduleDialogTime;
