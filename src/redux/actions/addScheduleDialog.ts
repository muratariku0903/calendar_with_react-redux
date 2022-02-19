import { ActionTypes } from "../actionTypes";
import { Dayjs } from 'dayjs';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export type SetAddScheduleDialogForm = {
    title?: string,
    date?: Dayjs | MaterialUiPickersDate,
    location?: string,
    description?: string,
};

type SetAddScheduleDialogAction = {
    type: ActionTypes.SET_ADD_SCHEDULE_DIALOG;
    payload: SetAddScheduleDialogForm;
};

export const setAddScheduleDialog = (form: SetAddScheduleDialogForm): SetAddScheduleDialogAction => {
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
