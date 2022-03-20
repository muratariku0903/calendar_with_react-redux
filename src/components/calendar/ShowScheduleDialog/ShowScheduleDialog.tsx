import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogActions, IconButton, Tooltip } from '@material-ui/core';
import { Close, DeleteOutlineOutlined, Edit } from "@material-ui/icons";
import { Schedule, ShowScheduleDialogState } from '../../../redux/stateTypes';
import ScheduleTitle from './parts/ScheduleTitle';
import ScheduleTime from './parts/ScheduleTime';
import ScheduleLocation from './parts/ScheduleLocation';
import ScheduleDescription from './parts/ScheduleDescription';

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
                <Tooltip title='閉じる' placement='bottom'>
                    <IconButton onClick={closeDialog} size="small">
                        <Close />
                    </IconButton>
                </Tooltip>
            </DialogActions>
            <DialogActions>
                <Tooltip title='削除' placement='bottom'>
                    <IconButton onClick={deleteSchedule} size="small">
                        <DeleteOutlineOutlined />
                    </IconButton>
                </Tooltip>
            </DialogActions>
            <DialogActions>
                <Tooltip title='編集' placement='bottom'>
                    <IconButton onClick={(e) => openUpdateScheduleDialog(e, dialog.schedule)} size="small">
                        <Edit />
                    </IconButton>
                </Tooltip>
            </DialogActions>
            <DialogContent>
                {dialog.schedule && (
                    <Fragment>
                        <ScheduleTitle title={dialog.schedule.title} date={dialog.schedule.date} />
                        {(dialog.schedule.time.start || dialog.schedule.time.end) && (
                            <ScheduleTime time={dialog.schedule.time} />
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
