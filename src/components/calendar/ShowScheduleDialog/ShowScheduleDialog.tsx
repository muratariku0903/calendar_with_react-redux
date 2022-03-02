import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import { Close, DeleteOutlineOutlined } from "@material-ui/icons";
import { Schedule, ShowScheduleDialogState } from '../../../redux/stateTypes';
import { ShowScheduleDialogActions } from '../../../redux/actions/showScheduleDialog';
import ScheduleTitle from './ScheduleTitle';
import ScheduleLocation from './ScheduleLocation';
import ScheduleDescription from './ScheduleDescription';

type ShowScheduleDialogProps = {
    dialog: ShowScheduleDialogState,
    closeDialog: () => void,
    deleteSchedule: () => void,
}

const ShowScheduleDialog: React.FC<ShowScheduleDialogProps> = ({ dialog, closeDialog, deleteSchedule }) => {
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <IconButton onClick={closeDialog} size="small">
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogActions>
                <IconButton onClick={deleteSchedule} size="small">
                    <DeleteOutlineOutlined />
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
