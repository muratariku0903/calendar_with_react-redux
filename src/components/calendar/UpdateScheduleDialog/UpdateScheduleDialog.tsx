import React from 'react';
import { Dialog, DialogContent, TextField, DialogActions, Button, Input, Grid, IconButton } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LocationOnOutlined, NotesOutlined, AccessTime, Close } from "@material-ui/icons";
import { withStyles } from '@material-ui/styles';
import { Props } from './containers/UpdateScheduleDialog';

const spacer = { margin: '4px 0' };

const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

const UpdateScheduleDialog: React.FC<Props> = ({ dialog, closeUpdateScheduleDialog, setUpdateScheduleDialog, updateSchedule }) => {
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeUpdateScheduleDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <IconButton onClick={closeUpdateScheduleDialog} size="small">
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogContent>
                <Title value={dialog.schedule.title} onChange={(e) => setUpdateScheduleDialog({ ...dialog.schedule, title: e.target.value })} autoFocus fullWidth placeholder="タイトル追加" />
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <AccessTime />
                    </Grid>
                    <Grid item xs={10}>
                        <DatePicker value={dialog.schedule.date} onChange={(d) => setUpdateScheduleDialog({ ...dialog.schedule, date: d })} variant="inline" format="YYYY年M月D日" animateYearScrolling disableToolbar fullWidth style={spacer} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <LocationOnOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField value={dialog.schedule.location} onChange={(e) => setUpdateScheduleDialog({ ...dialog.schedule, location: e.target.value })} style={spacer} fullWidth placeholder="場所を追加" />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <NotesOutlined />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField value={dialog.schedule.description} onChange={(e) => setUpdateScheduleDialog({ ...dialog.schedule, description: e.target.value })} style={spacer} fullWidth placeholder="説明を追加" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={updateSchedule} color="primary" variant="outlined">
                    更新
                </Button>
            </DialogActions>
        </Dialog >
    );
}

export default UpdateScheduleDialog;
