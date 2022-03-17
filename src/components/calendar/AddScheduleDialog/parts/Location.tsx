import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { LocationOnOutlined } from "@material-ui/icons";
import { DialogSchedule } from '../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type AddScheduleDialogLocationProps = {
    location: string;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialogLocation: React.FC<AddScheduleDialogLocationProps> = ({ location, setDialogForm }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <LocationOnOutlined />
            </Grid>
            <Grid item xs={10}>
                <TextField value={location} onChange={(e) => setDialogForm({ location: e.target.value })} style={spacer} fullWidth placeholder="場所を追加" />
            </Grid>
        </Grid>
    );
}

export default AddScheduleDialogLocation;
