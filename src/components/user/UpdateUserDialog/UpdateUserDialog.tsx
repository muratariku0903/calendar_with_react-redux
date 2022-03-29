import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Divider, Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { UpdateUserDialogState } from '../../../redux/stateTypes';
import UpdateUserDialogForm from './parts/UpdateUserDialogForm';
import { Validation } from '../../../services/validation';
import { rules } from '../constants';


export type StateProps = {
    dialog: UpdateUserDialogState;
}

export type DispatchProps = {
    setDialog: (user: UpdateUserDialogState['user']) => void;
    update: (user: UpdateUserDialogState['user']) => void;
    closeDialog: () => void;
};

export type UpdateUserDialogProps = StateProps & DispatchProps & {
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
    update: () => void;
};

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({ dialog, closeDialog, setDialog, update }) => {
    const validation = new Validation(rules);
    const validateErrorMessages = validation.validate(dialog.user);
    const isValid = validation.isEmptyErrorMessages(validateErrorMessages);
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
            <DialogActions>
                <IconButton onClick={closeDialog}>
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogTitle>編集</DialogTitle>
            <Divider />
            <DialogContent>
                <UpdateUserDialogForm user={dialog.user} setDialog={setDialog} validateErrorMessages={validateErrorMessages} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={update} color="primary" disabled={!isValid} variant="outlined">更新</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateUserDialog;
