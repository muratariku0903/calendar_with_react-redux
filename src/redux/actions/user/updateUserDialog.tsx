import { ActionTypes } from '../../actionTypes';
import { UpdateUserDialogState } from '../../stateTypes';

type SetUpdateUserDialogAction = {
    type: ActionTypes.SET_UPDATE_USER_DIALOG;
    payload: UpdateUserDialogState['user'];
}

export const setUpdateUserDialog = (dialog: UpdateUserDialogState['user']): SetUpdateUserDialogAction => {
    return {
        type: ActionTypes.SET_UPDATE_USER_DIALOG,
        payload: dialog,
    };
};

type OpenUpdateUserDialogAlertAction = {
    type: ActionTypes.OPEN_UPDATE_USER_DIALOG;
};

export const openUpdateUserDialog = (): OpenUpdateUserDialogAlertAction => {
    return { type: ActionTypes.OPEN_UPDATE_USER_DIALOG };
};

type CloseUpdateUserDialogAction = {
    type: ActionTypes.CLOSE_UPDATE_USER_DIALOG;
};

export const closeUpdateUserDialog = (): CloseUpdateUserDialogAction => {
    return { type: ActionTypes.CLOSE_UPDATE_USER_DIALOG };
};

type StartEditUpdateUserDialogAction = {
    type: ActionTypes.START_EDIT_UPDATE_USER_DIALOG;
};

export const startEditUpdateUserDialog = (): StartEditUpdateUserDialogAction => {
    return { type: ActionTypes.START_EDIT_UPDATE_USER_DIALOG };
};

type ShowUpdateUserDialogAlertAction = {
    type: ActionTypes.SHOW_UPDATE_USER_DIALOG_ALERT;
    payload: boolean;
};

export const showUpdateUserDialogAlert = (isShow: boolean): ShowUpdateUserDialogAlertAction => {
    return {
        type: ActionTypes.SHOW_UPDATE_USER_DIALOG_ALERT,
        payload: isShow,
    };
};

export type UpdateUserDialogActions = SetUpdateUserDialogAction | OpenUpdateUserDialogAlertAction | CloseUpdateUserDialogAction | ShowUpdateUserDialogAlertAction | StartEditUpdateUserDialogAction;
