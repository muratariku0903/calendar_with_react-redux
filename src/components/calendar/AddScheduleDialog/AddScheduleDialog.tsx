import React from 'react';
import { Dialog, DialogContent, TextField, DialogActions, Button, Input, Grid, IconButton } from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import { LocationOnOutlined, NotesOutlined, AccessTime, Close, TimeToLeaveOutlined } from "@material-ui/icons";
import { withStyles } from '@material-ui/styles';
import { AddScheduleDialogState, DialogSchedule } from '../../../redux/stateTypes';
import { AddScheduleDialogActions } from '../../../redux/actions/addScheduleDialog';

const spacer = { margin: '4px 0' };

const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

export type StateProps = {
    dialog: AddScheduleDialogState;
}

export type DispatchProps = {
    closeDialog: () => AddScheduleDialogActions;
    setDialogForm: (form: DialogSchedule) => AddScheduleDialogActions;
    addSchedule: (schedule: DialogSchedule) => void;
}

export type AddScheduleDialogProps = StateProps & DispatchProps & {
    addSchedule: () => void;
}

const AddScheduleDialog: React.FC<AddScheduleDialogProps> = ({ dialog, closeDialog, setDialogForm, addSchedule }) => {
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <IconButton onClick={closeDialog} size="small">
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogContent>
                <Title value={dialog.schedule.title} onChange={(e) => setDialogForm({ ...dialog.schedule, title: e.target.value })} autoFocus fullWidth placeholder="タイトル追加" />
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <AccessTime />
                    </Grid>
                    <Grid item xs={10}>
                        <DatePicker value={dialog.schedule.date} onChange={d => setDialogForm({ ...dialog.schedule, date: d })} variant="inline" format="YYYY年M月D日" animateYearScrolling disableToolbar fullWidth style={spacer} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <AccessTime />
                    </Grid>
                    <Grid item xs={5}>
                        <TimePicker label="開始" value={new Date()} onChange={(newValue) => { console.log(newValue); }} />
                    </Grid>
                    <Grid item xs={5}>
                        <TimePicker label="終了" value={new Date()} onChange={(newValue) => { console.log(newValue); }} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <LocationOnOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField value={dialog.schedule.location} onChange={(e) => setDialogForm({ ...dialog.schedule, location: e.target.value })} style={spacer} fullWidth placeholder="場所を追加" />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <NotesOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField value={dialog.schedule.description} onChange={(e) => setDialogForm({ ...dialog.schedule, description: e.target.value })} style={spacer} fullWidth placeholder="説明を追加" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={addSchedule} color="primary" variant="outlined">保存</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddScheduleDialog;
