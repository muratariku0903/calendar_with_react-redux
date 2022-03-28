import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Divider, Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { UpdateUserDialogState } from '../../../redux/stateTypes';
import UpdateUserDialogForm from './parts/UpdateUserDialogForm';


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
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
            <DialogTitle>編集</DialogTitle>
            <DialogActions>
                <IconButton onClick={closeDialog}>
                    <Close />
                </IconButton>
            </DialogActions>
            <Divider />
            <DialogContent>
                <UpdateUserDialogForm user={dialog.user} setDialog={setDialog} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={update} color="primary" disabled={false} variant="outlined">更新</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateUserDialog;
