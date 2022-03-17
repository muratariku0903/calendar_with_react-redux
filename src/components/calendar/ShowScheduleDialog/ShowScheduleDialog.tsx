import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import { Close, DeleteOutlineOutlined, Edit } from "@material-ui/icons";
import { Schedule, ShowScheduleDialogState } from '../../../redux/stateTypes';
import ScheduleTitle from './ScheduleTitle';
import ScheduleTime from './ScheduleTime';
import ScheduleLocation from './ScheduleLocation';
import ScheduleDescription from './ScheduleDescription';

export type StateProps = {
    dialog: ShowScheduleDialogState;
}

export type DispatchProps = {
    closeDialog: () => void;
    deleteSchedule: (schedule: Schedule) => void;
    openUpdateScheduleDialog: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, schedule: Schedule) => void;
}

export type ShowScheduleDialogProps = StateProps & DispatchProps & {
    deleteSchedule: () => void;
}

const ShowScheduleDialog: React.FC<ShowScheduleDialogProps> = ({ dialog, closeDialog, deleteSchedule, openUpdateScheduleDialog }) => {
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
            <DialogActions>
                <IconButton onClick={(e) => openUpdateScheduleDialog(e, dialog.schedule)} size="small">
                    <Edit />
                </IconButton>
            </DialogActions>
            <DialogContent>
                {dialog.schedule && (
                    <Fragment>
                        <ScheduleTitle title={dialog.schedule.title} date={dialog.schedule.date} />
                        {(dialog.schedule.time.start || dialog.schedule.time.end) && (
                            <ScheduleTime start={dialog.schedule.time.start} end={dialog.schedule.time.end} />
                        )}
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
