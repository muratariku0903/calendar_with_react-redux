import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { NotesOutlined } from "@material-ui/icons";
import { Schedule } from '../../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type UpdateScheduleDialogDescriptionProps = {
    description: Schedule['description'];
    setUpdateDialog: (scheduleItem: Partial<Schedule>) => void;
}

const UpdateScheduleDialogDescription: React.FC<UpdateScheduleDialogDescriptionProps> = ({ description, setUpdateDialog }) => {
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <NotesOutlined />
            </Grid>
            <Grid item xs={10}>
                <TextField value={description} onChange={(e) => setUpdateDialog({ description: e.target.value })} style={spacer} fullWidth placeholder="説明を追加" />
            </Grid>
        </Grid>
    );
}

export default UpdateScheduleDialogDescription;
