import { ActionTypes } from "../../actionTypes";
import { EmailScheduleDialogState } from '../../stateTypes';


type SetEmailScheduleDialogAction = {
    type: ActionTypes.SET_EMAIL_SCHEDULE_DIALOG;
    payload: EmailScheduleDialogState['form'];
}

export const setEmailScheduleDialog = (dialog: EmailScheduleDialogState['form']): SetEmailScheduleDialogAction => {
    return {
        type: ActionTypes.SET_EMAIL_SCHEDULE_DIALOG,
        payload: dialog
    }
}

type SetEmailContentsToEmailScheduleDialogAction = {
    type: ActionTypes.SET_EMAIL_CONTENTS_TO_EMAIL_SCHEDULE_DIALOG;
    payload: EmailScheduleDialogState['schedule'];
}

export const setEmailContentsToEmailScheduleDialog = (schedule: EmailScheduleDialogState['schedule']): SetEmailContentsToEmailScheduleDialogAction => {
    return {
        type: ActionTypes.SET_EMAIL_CONTENTS_TO_EMAIL_SCHEDULE_DIALOG,
        payload: schedule
    }
}

type StartEditEmailScheduleDialogAction = {
    type: ActionTypes.START_EDIT_EMAIL_SCHEDULE_DIALOG;
}

export const startEditEmailScheduleDialog = (): StartEditEmailScheduleDialogAction => {
    return {
        type: ActionTypes.START_EDIT_EMAIL_SCHEDULE_DIALOG
    };
}

type OpenEmailScheduleDialogAction = {
    type: ActionTypes.OPEN_EMAIL_SCHEDULE_DIALOG;
}

export const openEmailScheduleDialog = (): OpenEmailScheduleDialogAction => {
    return {
        type: ActionTypes.OPEN_EMAIL_SCHEDULE_DIALOG
    }
}

type CloseEmailScheduleDialogAction = {
    type: ActionTypes.CLOSE_EMAIL_SCHEDULE_DIALOG;
}

export const closeEmailScheduleDialog = (): CloseEmailScheduleDialogAction => {
    return {
        type: ActionTypes.CLOSE_EMAIL_SCHEDULE_DIALOG
    }
}

type ShowEmailScheduleDialogAlertAction = {
    type: ActionTypes.SHOW_EMAIL_SCHEDULE_DIALOG_ALERT;
    payload: boolean;
};

export const showEmailScheduleDialogAlert = (isShow: boolean): ShowEmailScheduleDialogAlertAction => {
    return {
        type: ActionTypes.SHOW_EMAIL_SCHEDULE_DIALOG_ALERT,
        payload: isShow,
    };
};

type SetEmailScheduleDialogLoadingAction = {
    type: ActionTypes.SET_EMAIL_SCHEDULE_DIALOG_LOADING;
    payload: boolean;
}

export const setEmailScheduleDialogLoading = (isLoading: boolean): SetEmailScheduleDialogLoadingAction => {
    return {
        type: ActionTypes.SET_EMAIL_SCHEDULE_DIALOG_LOADING,
        payload: isLoading,
    }
}

export type EmailScheduleDialogActions =
    SetEmailScheduleDialogAction
    | SetEmailContentsToEmailScheduleDialogAction
    | StartEditEmailScheduleDialogAction
    | OpenEmailScheduleDialogAction
    | CloseEmailScheduleDialogAction
    | ShowEmailScheduleDialogAlertAction
    | SetEmailScheduleDialogLoadingAction;

