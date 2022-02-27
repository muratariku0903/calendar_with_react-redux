import { ActionTypes } from "../actionTypes";
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// これstateで管理したやつ使えば
export type SetShowScheduleDialogForm = {
    title?: string,
    date?: MaterialUiPickersDate,
    location?: string,
    description?: string,
};

type SetShowScheduleDialogAction = {
    type: ActionTypes.SET_SHOW_SCHEDULE_DIALOG;
    payload: SetShowScheduleDialogForm;
};

export const setShowScheduleDialog = (schedule: SetShowScheduleDialogForm): SetShowScheduleDialogAction => {
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
