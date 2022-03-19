import { ActionTypes } from '../actionTypes';
import { Schedule } from '../stateTypes';

type SetUpdateScheduleDialogAction = {
    type: ActionTypes.SET_UPDATE_SCHEDULE_DIALOG;
    payload: Schedule;
}

export const setUpdateScheduleDialog = (schedule: Schedule): SetUpdateScheduleDialogAction => {
    return {
        type: ActionTypes.SET_UPDATE_SCHEDULE_DIALOG,
        payload: schedule,
    }
}

type StartEditUpdateScheduleDialogAction = {
    type: ActionTypes.START_EDIT_UPDATE_SCHEDULE_DIALOG;
}

export const startEditUpdateScheduleDialog = (): StartEditUpdateScheduleDialogAction => {
    return { type: ActionTypes.START_EDIT_UPDATE_SCHEDULE_DIALOG };
}

type OpenUpdateScheduleDialogAction = {
    type: ActionTypes.OPEN_UPDATE_SCHEDULE_DIALOG;
}

export const openUpdateScheduleDialog = (): OpenUpdateScheduleDialogAction => {
    return {
        type: ActionTypes.OPEN_UPDATE_SCHEDULE_DIALOG
    }
}

type CloseUpdateScheduleDialogAction = {
    type: ActionTypes.CLOSE_UPDATE_SCHEDULE_DIALOG;
}

export const closeUpdateScheduleDialog = (): CloseUpdateScheduleDialogAction => {
    return {
        type: ActionTypes.CLOSE_UPDATE_SCHEDULE_DIALOG
    }
}

export type UpdateScheduleDialogActions =
    SetUpdateScheduleDialogAction | StartEditUpdateScheduleDialogAction | OpenUpdateScheduleDialogAction | CloseUpdateScheduleDialogAction;
