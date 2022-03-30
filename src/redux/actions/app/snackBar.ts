import { ActionTypes } from '../../actionTypes';
import { SnackBarState } from '../../stateTypes';

type OpenSnackBarAction = {
    type: ActionTypes.OPEN_SNACKBAR;
}

export const openSnackBar = (): OpenSnackBarAction => {
    return { type: ActionTypes.OPEN_SNACKBAR };
};

type CloseSnackBarAction = {
    type: ActionTypes.CLOSE_SNACKBAR;
}

export const closeSnackBar = (): CloseSnackBarAction => {
    return { type: ActionTypes.CLOSE_SNACKBAR };
};

type SetSnackBarAction = {
    type: ActionTypes.SET_SNACKBAR;
    payload: {
        type: SnackBarState['type'];
        message: SnackBarState['message'];
    };
};

export const setSnackBar = (type: SnackBarState['type'], message: SnackBarState['message']): SetSnackBarAction => {
    return {
        type: ActionTypes.SET_SNACKBAR,
        payload: { type, message }
    };
};

export type SnackBarActions = OpenSnackBarAction | CloseSnackBarAction | SetSnackBarAction;
