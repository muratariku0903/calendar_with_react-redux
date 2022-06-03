import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { EmailScheduleDialogState, UserState } from '../../../../redux/stateTypes';
import BaseInputDialog from '../../../app/Dialog/BaseInputDialog/BaseInputDialog';
import EmailScheduleDialogForm from './parts/Form';
import { BaseValidation } from '../../../../services/Validation/baseValidation';
import { rules } from './validationRules';

export type StateProps = {
    dialog: EmailScheduleDialogState;
    emailFrom: UserState['user']['email'];
};

export type DispatchProps = {
    closeDialog: () => void;
    setDialogForm: (dialog: EmailScheduleDialogState['form']) => void;
    showAlert: () => void;
    closeAlert: () => void;
    sendEmail: (form: EmailScheduleDialogState['form'], schedule: EmailScheduleDialogState['schedule'], emailFrom: UserState['user']['email']) => void;
}

export type EmailScheduleDialogProps = StateProps & DispatchProps & {
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    isEmptyDialog: () => boolean;
    sendEmail: () => void;
}

const EmailScheduleDialog: React.FC<EmailScheduleDialogProps> = ({ dialog, setDialogForm, isEmptyDialog, closeDialog, showAlert, closeAlert, sendEmail }) => {
    const validation = new BaseValidation(rules);
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
                <Button onClick={sendEmail} disabled={!isValid} color="primary" variant="outlined">送信</Button>
            </DialogActions>
        </BaseInputDialog>
    );
}

export default EmailScheduleDialog;
