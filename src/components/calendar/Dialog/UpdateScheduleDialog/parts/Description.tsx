import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import { NotesOutlined } from "@material-ui/icons";
import { State, Schedule } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '4px 0' };

type UpdateScheduleDialogDescriptionProps = {
    description: Schedule['description'];
    setDialogForm: (scheduleItem: Partial<Schedule>) => void;
    errorMessage: string;
}

const UpdateScheduleDialogDescription: React.FC<UpdateScheduleDialogDescriptionProps> = ({ description, setDialogForm, errorMessage }) => {
    const isStartEdit = useSelector((state: State) => state.addScheduleDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <NotesOutlined />
            </Grid>
            <Grid item xs={10}>
                <TextField value={description} onChange={(e) => setDialogForm({ description: e.target.value })} style={spacer} fullWidth placeholder="説明を追加" />
            </Grid>
            {isError && (<ErrorMessage errorMessage={errorMessage} />)}
        </Grid>
    );
}

export default UpdateScheduleDialogDescription;
