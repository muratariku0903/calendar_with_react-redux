import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, IconButton, Tooltip } from '@material-ui/core';
import { Close } from "@material-ui/icons";
import { Schedule, UpdateScheduleDialogState, SchedulesState } from '../../../redux/stateTypes';
import UpdateScheduleDialogTitle from './containers/Title';
import UpdateScheduleDialogDate from './parts/Date';
import UpdateScheduleDialogTime from './parts/Time';
import UpdateScheduleDialogLocation from './parts/Location';
import UpdateScheduleDialogDescription from './parts/Description';

export type StateProps = {
    dialog: UpdateScheduleDialogState;
    schedules: SchedulesState['monthSchedules'];
};

export type DispatchProps = {
    closeUpdateScheduleDialog: () => void;
    setUpdateScheduleDialog: (schedule: Schedule) => void;
    updateSchedule: (prevDate: Schedule['date'], schedule: Schedule) => void;
}

export type UpdateScheduleDialogProps = StateProps & DispatchProps & {
    setUpdateDialog: (updateItem: Partial<Schedule>) => void;
    updateSchedule: () => void;
}

const UpdateScheduleDialog: React.FC<UpdateScheduleDialogProps> = ({ dialog, closeUpdateScheduleDialog, setUpdateDialog, updateSchedule }) => {
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeUpdateScheduleDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <Tooltip title='閉じる' placement='bottom'>
                    <IconButton onClick={closeUpdateScheduleDialog} size="small">
                        <Close />
                    </IconButton>
                </Tooltip>
            </DialogActions>
            <DialogContent>
                <UpdateScheduleDialogTitle title={dialog.schedule.title} setUpdateDialog={setUpdateDialog} />
                <UpdateScheduleDialogDate date={dialog.schedule.date} setUpdateDialog={setUpdateDialog} />
                <UpdateScheduleDialogTime time={dialog.schedule.time} setUpdateDialog={setUpdateDialog} />
                <UpdateScheduleDialogLocation location={dialog.schedule.location} setUpdateDialog={setUpdateDialog} />
                <UpdateScheduleDialogDescription description={dialog.schedule.description} setUpdateDialog={setUpdateDialog} />
            </DialogContent>
            <DialogActions>
                <Button onClick={updateSchedule} disabled={!dialog.schedule.title} color="primary" variant="outlined">更新</Button>
            </DialogActions>
        </Dialog >
    );
}

export default UpdateScheduleDialog;
