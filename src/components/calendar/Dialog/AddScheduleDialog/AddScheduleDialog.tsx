import React from 'react';
import { DialogContent, DialogActions, Button } from '@material-ui/core';
import { AddScheduleDialogState, DialogSchedule } from '../../../../redux/stateTypes';
import BaseInputDialog from '../base/containers/BaseInputDialog';
import AddScheduleDialogForm from './parts/Form';


export type StateProps = {
    dialog: AddScheduleDialogState;
}

export type DispatchProps = {
    setDialogForm: (form: DialogSchedule) => void;
    addSchedule: (schedule: DialogSchedule) => void;
}

export type AddScheduleDialogProps = StateProps & DispatchProps & {
    isEmptyDialog: () => boolean;
    addSchedule: () => void;
    setDialogForm: (scheduleItem: Partial<DialogSchedule>) => void;
}

const AddScheduleDialog: React.FC<AddScheduleDialogProps> = ({ dialog, setDialogForm, addSchedule, isEmptyDialog }) => {
    return (
        <BaseInputDialog isEmptyDialogForm={isEmptyDialog()}>
            <DialogContent>
                <AddScheduleDialogForm schedule={dialog.schedule} setDialogForm={setDialogForm} />
            </DialogContent>
            <DialogActions>
                <Button onClick={addSchedule} color="primary" disabled={!dialog.schedule.title} variant="outlined">保存</Button>
            </DialogActions>
        </BaseInputDialog>
    );
}

export default AddScheduleDialog;
