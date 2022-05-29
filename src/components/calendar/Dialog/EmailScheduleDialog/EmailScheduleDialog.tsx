import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { EmailScheduleDialogState } from '../../../../redux/stateTypes';
import BaseInputDialog from '../../../app/Dialog/BaseInputDialog/BaseInputDialog';
import EmailScheduleDialogForm from './parts/Form';
import { ScheduleValidation } from '../../../../services/Validation/scheduleValidation';
import { rules } from '../../validationRules';

export type StateProps = {
    dialog: EmailScheduleDialogState;
};

export type DispatchProps = {
    closeDialog: () => void;
    setDialogForm: (dialog: EmailScheduleDialogState['form']) => void;
    showAlert: () => void;
    closeAlert: () => void;
}

export type EmailScheduleDialogProps = StateProps & DispatchProps & {
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    isEmptyDialog: () => boolean;
}

const EmailScheduleDialog: React.FC<EmailScheduleDialogProps> = ({ dialog, setDialogForm, isEmptyDialog, closeDialog, showAlert, closeAlert }) => {
    const validation = new ScheduleValidation(rules);
    const validationErrorMessages = validation.validate<EmailScheduleDialogState['form']>(dialog.form);
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
                <EmailScheduleDialogForm form={dialog.form} setDialogForm={setDialogForm} errorMessages={validationErrorMessages} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => console.log('hello')} disabled={!isValid} color="primary" variant="outlined">送信</Button>
            </DialogActions>
        </BaseInputDialog>
    );
}

export default EmailScheduleDialog;
