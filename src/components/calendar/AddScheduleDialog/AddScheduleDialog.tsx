import React, { Fragment } from 'react';
import { Dialog, DialogContent, DialogActions, Button, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Close } from "@material-ui/icons";
import { AddScheduleDialogState, DialogSchedule } from '../../../redux/stateTypes';
import AddScheduleDialogForm from './parts/Form';


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

const AddScheduleDialog: React.FC<AddScheduleDialogProps> = ({ dialog, closeDialog, setDialogForm, addSchedule, isEmptyDialog, showAlert, closeAlert }) => {
    return (
        <Fragment>
            <Dialog open={dialog.isOpenDialog} onClose={isEmptyDialog() ? closeDialog : showAlert} maxWidth="xs" fullWidth>
                <DialogActions>
                    <Tooltip title='閉じる' placement='bottom'>
                        <IconButton onClick={closeDialog} size="small">
                            <Close />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
                <DialogContent>
                    <AddScheduleDialogForm schedule={dialog.schedule} setDialogForm={setDialogForm} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addSchedule} color="primary" disabled={!dialog.schedule.title} variant="outlined">保存</Button>
                </DialogActions>
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

export default AddScheduleDialog;
