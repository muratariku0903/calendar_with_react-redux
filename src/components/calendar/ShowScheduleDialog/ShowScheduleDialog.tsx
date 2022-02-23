import React, { Fragment } from 'react';
import {
    Dialog, DialogContent, DialogActions, Grid, IconButton, Typography
} from '@material-ui/core';
import { LocationOnOutlined, NotesOutlined, Close } from "@material-ui/icons";
import { ShowScheduleDialogState } from '../../../redux/stateTypes';
import { ShowScheduleDialogActions } from '../../../redux/actions/showScheduleDialog';

const spacer = { margin: '4px 0' };

type ShowScheduleDialogProps = {
    dialog: ShowScheduleDialogState,
    closeDialog: () => ShowScheduleDialogActions,
}

const ShowScheduleDialog: React.FC<ShowScheduleDialogProps> = ({ dialog, closeDialog }) => {
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <IconButton onClick={closeDialog} size="small">
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogContent>
                {dialog.schedule && (
                    <Fragment>
                        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <span>タイトル</span>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h5" component="h2">{dialog.schedule.title}</Typography>
                                <Typography color='textSecondary'>{dialog.schedule.date?.format('M月D日')}</Typography>
                            </Grid>
                        </Grid>
                        {dialog.schedule.location && (
                            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <LocationOnOutlined />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography>{dialog.schedule.location}</Typography>
                                </Grid>
                            </Grid>
                        )}
                        {dialog.schedule.description && (
                            <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <NotesOutlined />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography>{dialog.schedule.description}</Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Fragment>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ShowScheduleDialog;
