import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';


type OutterProps = {
    isShowAlert: boolean;
    closeDialog: () => void;
    closeAlert: () => void;
}

export type UpdateUserDialogAlertProps = OutterProps;

const UpdateUserDialogAlert: React.FC<UpdateUserDialogAlertProps> = ({ isShowAlert, closeDialog, closeAlert }) => {
    return (
        <Dialog open={isShowAlert} onClose={closeAlert} maxWidth="xs" fullWidth>
            <DialogContent>
                <Typography>保存されませんが破棄しますか？</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary" variant="outlined">破棄</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateUserDialogAlert;
