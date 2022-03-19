import { DialogSchedule } from "../stateTypes";
import { ActionTypes } from "../actionTypes";


type SetAddScheduleDialogAction = {
    type: ActionTypes.SET_ADD_SCHEDULE_DIALOG;
    payload: DialogSchedule;
};

export const setAddScheduleDialog = (form: DialogSchedule): SetAddScheduleDialogAction => {
    return {
        type: ActionTypes.SET_ADD_SCHEDULE_DIALOG,
        payload: form,
    }
};

type StartEditAddScheduleDialogAction = {
    type: ActionTypes.START_EDIT_ADD_SCHEDULE_DIALOG;
}

export const startEditAddScheduleDialog = (): StartEditAddScheduleDialogAction => {
    return { type: ActionTypes.START_EDIT_ADD_SCHEDULE_DIALOG };
}

type OpenAddScheduleDialogAction = {
    type: ActionTypes.OPEN_ADD_SCHEDULE_DIALOG;
};

export const openAddScheduleDialog = (): OpenAddScheduleDialogAction => {
    return { type: ActionTypes.OPEN_ADD_SCHEDULE_DIALOG };
};

type CloseAddScheduleDialogAction = {
    type: ActionTypes.CLOSE_ADD_SCHEDULE_DIALOG;
};

export const closeAddScheduleDialog = (): CloseAddScheduleDialogAction => {
    return { type: ActionTypes.CLOSE_ADD_SCHEDULE_DIALOG };
};

export type AddScheduleDialogActions =
    SetAddScheduleDialogAction | StartEditAddScheduleDialogAction | OpenAddScheduleDialogAction | CloseAddScheduleDialogAction;
