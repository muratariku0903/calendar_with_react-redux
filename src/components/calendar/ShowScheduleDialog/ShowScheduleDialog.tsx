import React, { Fragment } from 'react';
import {
    Dialog, DialogContent, DialogActions, Grid, IconButton, Typography
} from '@material-ui/core';
import { LocationOnOutlined, NotesOutlined, Close } from "@material-ui/icons";
import { ShowScheduleDialogState } from '../../../redux/stateTypes';
import { ShowScheduleDialogActions } from '../../../redux/actions/showScheduleDialog';
import ScheduleTitle from './ScheduleTitle';
import ScheduleLocation from './ScheduleLocation';
import ScheduleDescription from './ScheduleDescription';

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
                        <ScheduleTitle title={dialog.schedule.title} date={dialog.schedule.date} />
                        {dialog.schedule.location && (
                            <ScheduleLocation location={dialog.schedule.location} />
                        )}
                        {dialog.schedule.description && (
                            <ScheduleDescription description={dialog.schedule.description} />
                        )}
                    </Fragment>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ShowScheduleDialog;
