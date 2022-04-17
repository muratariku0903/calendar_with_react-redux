import React, { ReactNode, Fragment } from 'react';
import { Dialog, DialogContent, DialogActions, Button, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Close } from "@material-ui/icons";
import { BaseInputDialogState } from '../../../../redux/stateTypes';


export type StateProps = {
    dialog: BaseInputDialogState;
}

export type DispatchProps = {
    closeDialog: () => void;
    showAlert: () => void;
    closeAlert: () => void;
}

export type OutterProps = {
    isEmptyDialogForm: boolean;
}

export type ChildrenProps = {
    children: ReactNode;
}

export type BaseInputDialogProps = StateProps & DispatchProps & OutterProps & ChildrenProps;

const BaseInputDialog: React.FC<BaseInputDialogProps> = ({ dialog, isEmptyDialogForm, closeDialog, showAlert, closeAlert, children }) => {
    console.log(dialog);
    return (
        <Fragment>
            <Dialog open={dialog.isOpenDialog} onClose={isEmptyDialogForm ? closeDialog : showAlert} maxWidth="xs" fullWidth>
                <DialogActions>
                    <Tooltip title='閉じる' placement='bottom'>
                        <IconButton onClick={closeDialog} size="small">
                            <Close />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
                {children}
            </Dialog>
            <Dialog open={dialog.isShowAlert} onClose={closeAlert} maxWidth="xs" fullWidth>
                <DialogContent>
                    <Typography>予定は保存されませんが破棄しますか？</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary" variant="outlined">破棄</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default BaseInputDialog;
