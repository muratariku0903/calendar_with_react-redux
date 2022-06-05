import React from 'react';
import { DialogTitle, DialogContent, DialogActions, Divider, Button } from '@material-ui/core';
import { UpdateUserDialogState, User } from '../../../redux/stateTypes';
import BaseInputDialog from '../../app/Dialog/BaseInputDialog/BaseInputDialog';
import UpdateUserDialogForm from './parts/UpdateUserDialogForm';
import { AuthValidation } from '../../../services/Validation/authValidation';
import { rules } from '../validationRules';
import { useFetchAllUsers } from '../../../hooks/user';


export type StateProps = {
    dialog: UpdateUserDialogState;
    loginUser: User;
}

export type DispatchProps = {
    setDialog: (user: UpdateUserDialogState['user']) => void;
    update: (user: UpdateUserDialogState['user']) => void;
    closeDialog: () => void;
    showAlert: () => void;
    closeAlert: () => void;
};

export type UpdateUserDialogProps = StateProps & DispatchProps & {
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
    update: () => void;
    isEmptyDialog: () => boolean;
};

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({ loginUser, dialog, closeDialog, setDialog, update, showAlert, closeAlert, isEmptyDialog }) => {
    const users = useFetchAllUsers().filter(user => user.id != loginUser.id);
    const validation = new AuthValidation(rules, users);
    const validateErrorMessages = validation.validate<UpdateUserDialogState['user']>(dialog.user);
    const isValid = validation.isEmptyErrorMessages(validateErrorMessages);

    return (
        <BaseInputDialog
            isOpenDialog={dialog.isOpenDialog}
            isShowAlert={dialog.isShowAlert}
            closeDialog={closeDialog}
            closeAlert={closeAlert}
            showAlert={showAlert}
            isEmptyDialogForm={isEmptyDialog()}
        >
            <DialogTitle>編集</DialogTitle>
            <Divider />
            <DialogContent>
                <UpdateUserDialogForm user={dialog.user} setDialog={setDialog} validateErrorMessages={validateErrorMessages} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={update} color="primary" disabled={!isValid} variant="outlined">更新</Button>
            </DialogActions>
        </BaseInputDialog>
    );
}

export default UpdateUserDialog;
