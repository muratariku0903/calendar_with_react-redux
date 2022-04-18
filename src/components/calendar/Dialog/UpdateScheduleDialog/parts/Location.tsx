import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { LocationOnOutlined } from "@material-ui/icons";
import { Schedule } from '../../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type UpdateScheduleDialogLocationProps = {
    location: Schedule['location'];
    setDialogForm: (scheduleItem: Partial<Schedule>) => void;
}

const UpdateScheduleDialogLocation: React.FC<UpdateScheduleDialogLocationProps> = ({ location, setDialogForm }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <LocationOnOutlined />
            </Grid>
            <Grid item xs={10}>
                <TextField value={location} onChange={e => setDialogForm({ location: e.target.value })} style={spacer} fullWidth placeholder="場所を追加" />
            </Grid>
        </Grid>
    );
}

export default UpdateScheduleDialogLocation;
