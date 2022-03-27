import { ActionTypes } from '../../actionTypes';
import { SignupDialogState } from '../../stateTypes';

type SetSignupDialogAction = {
    type: ActionTypes.SET_SIGNUP_DIALOG;
    payload: SignupDialogState['dialog'];
}

export const setSignupDialog = (dialog: SignupDialogState['dialog']): SetSignupDialogAction => {
    return {
        type: ActionTypes.SET_SIGNUP_DIALOG,
        payload: dialog,
    };
};

type ShowSignupDialogAlertAction = {
    type: ActionTypes.SHOW_SIGNUP_DIALOG_ALERT;
    payload: boolean;
};

export const showSignupDialogAlert = (isShow: boolean): ShowSignupDialogAlertAction => {
    return {
        type: ActionTypes.SHOW_SIGNUP_DIALOG_ALERT,
        payload: isShow,
    };
};

export type SignupDialogActions = SetSignupDialogAction | ShowSignupDialogAlertAction;
