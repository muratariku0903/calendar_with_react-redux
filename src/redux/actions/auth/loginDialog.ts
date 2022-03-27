import { ActionTypes } from '../../actionTypes';
import { LoginDialogState } from '../../stateTypes';

type SetLoginDialogAction = {
    type: ActionTypes.SET_LOGIN_DIALOG;
    payload: LoginDialogState['dialog'];
}

export const setLoginDialog = (dialog: LoginDialogState['dialog']): SetLoginDialogAction => {
    return {
        type: ActionTypes.SET_LOGIN_DIALOG,
        payload: dialog,
    };
};

type ShowLoginDialogAlertAction = {
    type: ActionTypes.SHOW_LOGIN_DIALOG_ALERT;
    payload: boolean;
};

export const showSignupDialogAlert = (isShow: boolean): ShowLoginDialogAlertAction => {
    return {
        type: ActionTypes.SHOW_LOGIN_DIALOG_ALERT,
        payload: isShow,
    };
};

export type LoginDialogActions = SetLoginDialogAction | ShowLoginDialogAlertAction;
