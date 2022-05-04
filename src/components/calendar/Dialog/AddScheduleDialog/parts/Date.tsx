import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { AccessTime } from "@material-ui/icons";
import { DialogSchedule, Schedule } from '../../../../../redux/stateTypes';
import { setSnackBar } from '../../../../../redux/actions/app/snackBar';
import { getScheduleTimeMergedDate } from '../../../../../services/schedule';
import dayjs from 'dayjs';

const spacer = { margin: '4px 0' };

type AddScheduleDialogDateProps = {
    date: Schedule['date'];
    time: Schedule['time'];
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialogDate: React.FC<AddScheduleDialogDateProps> = ({ date, time, setDialogForm }) => {
    const dispatch = useDispatch();
    const setDialogFormDate = (date: number | undefined) => {
        if (date) {
            setDialogForm({ date, time: getScheduleTimeMergedDate(date, time) });
        } else {
            dispatch(setSnackBar('error', '正しい日付を選択してください'));
        }
    }
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <AccessTime />
            </Grid>
            <Grid item xs={10}>
                <DatePicker
                    value={dayjs.unix(date)}
                    onChange={d => setDialogFormDate(d?.unix())}
                    variant="inline"
                    format="YYYY年M月D日"
                    animateYearScrolling
                    disableToolbar
                    fullWidth
                    style={spacer}
                />
            </Grid>
        </Grid>
    );
}

export default AddScheduleDialogDate;
