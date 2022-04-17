import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { NotesOutlined } from "@material-ui/icons";
import { DialogSchedule } from '../../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type AddScheduleDialogDescriptionProps = {
    description: string;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialogDescription: React.FC<AddScheduleDialogDescriptionProps> = ({ description, setDialogForm }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <NotesOutlined />
            </Grid>
            <Grid item xs={10}>
                <TextField value={description} onChange={(e) => setDialogForm({ description: e.target.value })} style={spacer} fullWidth placeholder="説明を追加" />
            </Grid>
        </Grid>
    );
}

export default AddScheduleDialogDescription;
