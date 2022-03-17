import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, IconButton } from '@material-ui/core';
import { Close } from "@material-ui/icons";
import { AddScheduleDialogState, DialogSchedule } from '../../../redux/stateTypes';
import { AddScheduleDialogActions } from '../../../redux/actions/addScheduleDialog';
import AddScheduleDialogForm from './parts/Form';


export type StateProps = {
    dialog: AddScheduleDialogState;
}

export type DispatchProps = {
    closeDialog: () => AddScheduleDialogActions;
    setDialogForm: (form: DialogSchedule) => void;
    addSchedule: (schedule: DialogSchedule) => void;
}

export type AddScheduleDialogProps = StateProps & DispatchProps & {
    addSchedule: () => void;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialog: React.FC<AddScheduleDialogProps> = ({ dialog, closeDialog, setDialogForm, addSchedule }) => {
    return (
        <Dialog open={dialog.isOpenDialog} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogActions>
                <IconButton onClick={closeDialog} size="small">
                    <Close />
                </IconButton>
            </DialogActions>
            <DialogContent>
                <AddScheduleDialogForm schedule={dialog.schedule} setDialogForm={setDialogForm} />
            </DialogContent>
            <DialogActions>
                <Button onClick={addSchedule} color="primary" variant="outlined">保存</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddScheduleDialog;
