import { ActionTypes } from '../../actionTypes';
import { BaseInputDialogState } from '../../stateTypes';


type OpenBaseInputDialogAction = {
    type: ActionTypes.OPEN_BASE_INPUT_DIALOG;
}

export const openBaseInputDialog = (): OpenBaseInputDialogAction => {
    return { type: ActionTypes.OPEN_BASE_INPUT_DIALOG };
};

type CloseBaseInputDialogAction = {
    type: ActionTypes.CLOSE_BASE_INPUT_DIALOG;
}

export const closeBaseInputDialog = (): CloseBaseInputDialogAction => {
    return { type: ActionTypes.CLOSE_BASE_INPUT_DIALOG };
};

type StartEditBaseInputDialogAction = {
    type: ActionTypes.START_EDIT_BASE_INPUT_DIALOG;
}

export const startEditBaseInputDialog = (): StartEditBaseInputDialogAction => {
    return { type: ActionTypes.START_EDIT_BASE_INPUT_DIALOG };
}

type ShowBaseInputDialogAlertAction = {
    type: ActionTypes.SHOW_BASE_INPUT_DIALOG_ALERT;
    payload: boolean;
};

export const showBaseInputDialogAlert = (isShow: BaseInputDialogState['isShowAlert']): ShowBaseInputDialogAlertAction => {
    return {
        type: ActionTypes.SHOW_BASE_INPUT_DIALOG_ALERT,
        payload: isShow,
    };
};


export type BaseInputDialogActions =
    OpenBaseInputDialogAction | CloseBaseInputDialogAction | StartEditBaseInputDialogAction | ShowBaseInputDialogAlertAction;
