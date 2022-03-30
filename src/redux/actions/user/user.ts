import { ActionTypes } from '../../actionTypes';
import { UserState } from '../../stateTypes';

type SetUserAction = {
    type: ActionTypes.SET_USER;
    payload: UserState['user'];
};

export const setUser = (user: UserState['user']): SetUserAction => {
    return {
        type: ActionTypes.SET_USER,
        payload: user,
    };
};

type ResetUserAction = {
    type: ActionTypes.RESET_USER;
};

export const resetUser = (): ResetUserAction => {
    return { type: ActionTypes.RESET_USER };
};

type SetUserLoadingAction = {
    type: ActionTypes.SET_USER_LOADING;
    payload: UserState['isLoading'];
}

export const setUserLoading = (isLoading: UserState['isLoading']): SetUserLoadingAction => {
    return {
        type: ActionTypes.SET_USER_LOADING,
        payload: isLoading,
    };
};


export type UserActions = SetUserAction | ResetUserAction | SetUserLoadingAction;
