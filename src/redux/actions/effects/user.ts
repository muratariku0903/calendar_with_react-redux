import { setUser, resetUser, UserActions } from '../user/user';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, SignupDialogState, LoginDialogState, UpdateUserDialogState } from '../../stateTypes';
import { userAPI } from '../../../firebase/api/user';
import { authAPI } from '../../../firebase/api/auth';


type UserThunkAction = ThunkAction<void, State, undefined, UserActions>;


export const asyncSignup = (user: SignupDialogState['dialog']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    const { email, password } = user;
    try {
        const uid = await authAPI.signup(email, password);
        await userAPI.addUser(uid, user);
        dispatch(setUser(user));
        console.log('Set signup user to state.');
    } catch (e) {
        console.error(`Fail setting signup user to state because:${e}`);
        // dispatch(setScheduleError(String(e)));
    }
}

export const asyncLogin = (user: LoginDialogState['dialog']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    const { email, password } = user;
    try {
        const uid = await authAPI.login(email, password);
        const loginUser = await userAPI.fetchUser(uid);
        dispatch(setUser(loginUser));
        console.log('Set login user to state.');
    } catch (e) {
        console.error(`Fail setting login user to state because:${e}`);
        // dispatch(setScheduleError(String(e)));
    }
}

export const asyncLogout = (): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    try {
        await authAPI.logout();
        dispatch(resetUser());
        console.log('Reset state of login user.');
    } catch (e) {
        console.error(`Fail resetting state of login user because:${e}`);
        // dispatch(setScheduleError(String(e)));
    }
}

export const asyncUpdate = (user: UpdateUserDialogState['user']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    const { email, password } = user;
    try {
        const uid = await authAPI.update(email, password);
        await userAPI.updateUser(uid, user);
        dispatch(setUser(user));
        console.log('Update state of login user.');
    } catch (e) {
        console.error(`Fail updating state of login user because:${e}`);
        // dispatch(setScheduleError(String(e)));
    }
}


