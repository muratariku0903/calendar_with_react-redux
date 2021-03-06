import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { Schedule, UpdateScheduleDialogState, SchedulesState } from '../../../../redux/stateTypes';
import BaseInputDialog from '../../../app/Dialog/BaseInputDialog/BaseInputDialog';
import UpdateScheduleDialogForm from './parts/Form';
import { ScheduleValidation } from '../../../../services/Validation/scheduleValidation';
import { rules } from '../../validationRules';
import { useGetDateSchedules } from '../../../../hooks/schedules';

export type StateProps = {
    dialog: UpdateScheduleDialogState;
    schedules: SchedulesState['monthSchedules'];
};

export type DispatchProps = {
    closeDialog: () => void;
    setDialogForm: (schedule: Schedule) => void;
    updateSchedule: (prevDate: Schedule['date'], schedule: Schedule) => void;
    showAlert: () => void;
    closeAlert: () => void;
}

export type UpdateScheduleDialogProps = StateProps & DispatchProps & {
    setDialogForm: (updateItem: Partial<Schedule>) => void;
    updateSchedule: () => void;
    isEmptyDialog: () => boolean;
}

const UpdateScheduleDialog: React.FC<UpdateScheduleDialogProps> = ({ dialog, schedules, setDialogForm, updateSchedule, isEmptyDialog, closeDialog, showAlert, closeAlert }) => {
    const dateSchedules = useGetDateSchedules([dialog.isOpenDialog, dialog.schedule.date], schedules, dialog.schedule.date);
    const validation = new ScheduleValidation(rules, dateSchedules.filter((schedule) => schedule.id != dialog.schedule.id));
    const validationErrorMessages = validation.validate<UpdateScheduleDialogState['schedule']>(dialog.schedule);
    const isValid = validation.isEmptyErrorMessages(validationErrorMessages);

    return (
        <BaseInputDialog
            isOpenDialog={dialog.isOpenDialog}
            isShowAlert={dialog.isShowAlert}
            closeDialog={closeDialog}
            showAlert={showAlert}
            closeAlert={closeAlert}
            isEmptyDialogForm={isEmptyDialog()}
        >
            <DialogContent>
                <UpdateScheduleDialogForm schedule={dialog.schedule} setDialogForm={setDialogForm} errorMessages={validationErrorMessages} />
            </DialogContent>
            <DialogActions>
                <Button onClick={updateSchedule} disabled={!isValid} color="primary" variant="outlined">??????</Button>
            </DialogActions>
        </BaseInputDialog>
    );
}

export default UpdateScheduleDialog;
