import React from 'react';
import { Grid } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { AccessTime } from "@material-ui/icons";
import { DialogSchedule, Schedule } from '../../../../redux/stateTypes';
import dayjs from 'dayjs';

const spacer = { margin: '4px 0' };

type AddScheduleDialogDateProps = {
    date: Schedule['date'];
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialogDate: React.FC<AddScheduleDialogDateProps> = ({ date, setDialogForm }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <AccessTime />
            </Grid>
            <Grid item xs={10}>
                <DatePicker
                    value={dayjs.unix(date)}
                    onChange={d => setDialogForm({ date: d?.unix() })}
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
