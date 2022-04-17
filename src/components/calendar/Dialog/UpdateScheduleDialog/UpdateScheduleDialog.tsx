import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Schedule, UpdateScheduleDialogState, SchedulesState } from '../../../../redux/stateTypes';
import UpdateScheduleDialogTitle from './containers/Title';
import UpdateScheduleDialogDate from './parts/Date';
import UpdateScheduleDialogTime from './parts/Time';
import UpdateScheduleDialogLocation from './parts/Location';
import UpdateScheduleDialogDescription from './parts/Description';
import BaseInputDialog from '../base/containers/BaseInputDialog';

export type StateProps = {
    dialog: UpdateScheduleDialogState;
    schedules: SchedulesState['monthSchedules'];
};

export type DispatchProps = {
    setUpdateScheduleDialog: (schedule: Schedule) => void;
    updateSchedule: (prevDate: Schedule['date'], schedule: Schedule) => void;
}

export type UpdateScheduleDialogProps = StateProps & DispatchProps & {
    setUpdateDialog: (updateItem: Partial<Schedule>) => void;
    updateSchedule: () => void;
    isEmptyDialog: () => boolean;
}

const UpdateScheduleDialog: React.FC<UpdateScheduleDialogProps> = ({ dialog, setUpdateDialog, updateSchedule, isEmptyDialog }) => {
    return (
        <BaseInputDialog isEmptyDialogForm={isEmptyDialog()}>
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
        </BaseInputDialog>
    );
}

export default UpdateScheduleDialog;
