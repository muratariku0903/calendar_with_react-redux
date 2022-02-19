import React from 'react';
import {
    Dialog, DialogContent, TextField, DialogActions, Button, Input, Grid, IconButton
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LocationOnOutlined, NotesOutlined, AccessTime, Close } from "@material-ui/icons";
import { withStyles } from '@material-ui/styles';
import { AddScheduleDialogState } from '../../redux/stateTypes';
import { AddScheduleDialogActions, SetAddScheduleDialogForm } from '../../redux/actions/addScheduleDialog';

const spacer = { margin: '4px 0' };

const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

type AddScheduleDialogProps = {
    dialog: AddScheduleDialogState,
    closeDialog: () => AddScheduleDialogActions,
    setDialogForm: (form: SetAddScheduleDialogForm) => AddScheduleDialogActions,
}

const AddScheduleDialog: React.FC<AddScheduleDialogProps> = ({ dialog, closeDialog, setDialogForm }) => {
    console.log(dialog);
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <IconButton onClick={closeDialog} size="small">
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogContent>
                <Title value={dialog.form.title} onChange={(e) => setDialogForm({ title: e.target.value })} autoFocus fullWidth placeholder="タイトル追加" />
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <AccessTime />
                    </Grid>
                    <Grid item xs={10}>
                        <DatePicker value={dialog.form.date} onChange={d => setDialogForm({ date: d })} variant="inline" format="YYYY年M月D日" animateYearScrolling disableToolbar fullWidth style={spacer} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <LocationOnOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField value={dialog.form.location} onChange={(e) => setDialogForm({ location: e.target.value })} style={spacer} fullWidth placeholder="場所を追加" />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <NotesOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField value={dialog.form.description} onChange={(e) => setDialogForm({ description: e.target.value })} style={spacer} fullWidth placeholder="説明を追加" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="outlined">
                    保存
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddScheduleDialog;
