import { UserActions } from '../auth/user';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, SignupDialogState, LoginDialogState } from '../../stateTypes';
import { setUser } from '../auth/user';
import { userAPI } from '../../../firebase/api/user';


type UserThunkAction = ThunkAction<void, State, undefined, UserActions>;


export const asyncSignup = (user: SignupDialogState['dialog']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    try {
        const uid = await userAPI.signup(user);
        await userAPI.addUser(uid, user);
        dispatch(setUser(user));
        console.log('Set signup user to state.');
    } catch (e) {
        console.error(`Fail setting signup user to state because:${e}`);
        // dispatch(setScheduleError(String(e)));
    }
}

export const asyncLogin = (user: LoginDialogState['dialog']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    try {
        const uid = await userAPI.login(user);
        const loginUser = await userAPI.fetchUser(uid);
        dispatch(setUser(loginUser));
        console.log('Set login user to state.');
    } catch (e) {
        console.error(`Fail setting login user to state because:${e}`);
        // dispatch(setScheduleError(String(e)));
    }
}


