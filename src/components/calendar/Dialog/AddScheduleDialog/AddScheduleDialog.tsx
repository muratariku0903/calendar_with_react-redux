import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { AddScheduleDialogState, DialogSchedule } from '../../../../redux/stateTypes';
import BaseInputDialog from '../../../app/Dialog/BaseInputDialog/BaseInputDialog';
import AddScheduleDialogForm from './parts/Form';
import { Validation } from '../../../../services/validation';
import { rules } from '../../constants';


export type StateProps = {
    dialog: AddScheduleDialogState;
}

export type DispatchProps = {
    closeDialog: () => void;
    setDialogForm: (form: DialogSchedule) => void;
    addSchedule: (schedule: DialogSchedule) => void;
    showAlert: () => void;
    closeAlert: () => void;
}

export type AddScheduleDialogProps = StateProps & DispatchProps & {
    isEmptyDialog: () => boolean;
    addSchedule: () => void;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialog: React.FC<AddScheduleDialogProps> = ({ dialog, setDialogForm, addSchedule, isEmptyDialog, closeDialog, showAlert, closeAlert }) => {
    const validation = new Validation(rules);
    const validationErrorMessages = validation.validate<AddScheduleDialogState['schedule']>(dialog.schedule);
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
                <AddScheduleDialogForm schedule={dialog.schedule} setDialogForm={setDialogForm} errorMessages={validationErrorMessages} />
            </DialogContent>
            <DialogActions>
                <Button onClick={addSchedule} color="primary" disabled={!isValid} variant="outlined">保存</Button>
            </DialogActions>
        </BaseInputDialog>
    );
}

export default AddScheduleDialog;
