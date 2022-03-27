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


type LoginUserAction = {
    type: ActionTypes.LOGIN_USER;
};

export const loginUser = (): LoginUserAction => {
    return { type: ActionTypes.LOGIN_USER };
};


type LogoutUserAction = {
    type: ActionTypes.LOGOUT_USER;
};

export const logoutUser = (): LogoutUserAction => {
    return { type: ActionTypes.LOGOUT_USER };
};


export type UserActions = SetUserAction | LoginUserAction | LogoutUserAction;
