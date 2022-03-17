import { Schedule } from "../stateTypes";
import { ActionTypes } from "../actionTypes";


type SetShowScheduleDialogAction = {
    type: ActionTypes.SET_SHOW_SCHEDULE_DIALOG;
    payload: Schedule;
};

export const setShowScheduleDialog = (schedule: Schedule): SetShowScheduleDialogAction => {
    return {
        type: ActionTypes.SET_SHOW_SCHEDULE_DIALOG,
        payload: schedule,
    }
};

type OpenShowScheduleDialogAction = {
    type: ActionTypes.OPEN_SHOW_SCHEDULE_DIALOG;
};

export const openShowScheduleDialog = (): OpenShowScheduleDialogAction => {
    return { type: ActionTypes.OPEN_SHOW_SCHEDULE_DIALOG };
};

type CloseShowScheduleDialogAction = {
    type: ActionTypes.CLOSE_SHOW_SCHEDULE_DIALOG;
};

export const closeShowScheduleDialog = (): CloseShowScheduleDialogAction => {
    return { type: ActionTypes.CLOSE_SHOW_SCHEDULE_DIALOG };
};

export type ShowScheduleDialogActions = SetShowScheduleDialogAction | OpenShowScheduleDialogAction | CloseShowScheduleDialogAction;
