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

export type AddScheduleDialogActions = SetAddScheduleDialogAction | OpenAddScheduleDialogAction | CloseAddScheduleDialogAction;
