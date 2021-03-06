import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import { NotesOutlined } from "@material-ui/icons";
import { State, DialogSchedule } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '4px 0' };

type AddScheduleDialogDescriptionProps = {
    description: string;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
    errorMessage: string;
}

const AddScheduleDialogDescription: React.FC<AddScheduleDialogDescriptionProps> = ({ description, setDialogForm, errorMessage }) => {
    const isStartEdit = useSelector((state: State) => state.addScheduleDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);
    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <NotesOutlined />
            </Grid>
            <Grid item xs={10}>
                <TextField value={description} onChange={(e) => setDialogForm({ description: e.target.value })} style={spacer} fullWidth placeholder="説明を追加" />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default AddScheduleDialogDescription;
