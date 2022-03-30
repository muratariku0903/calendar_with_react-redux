import { setUser, resetUser, setUserLoading, UserActions } from '../user/user';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, SignupDialogState, LoginDialogState, UpdateUserDialogState } from '../../stateTypes';
import { userAPI } from '../../../firebase/api/user';
import { authAPI } from '../../../firebase/api/auth';
import { setSnackBar } from '../app/snackBar';


type UserThunkAction = ThunkAction<void, State, undefined, UserActions>;


export const asyncSignup = (user: SignupDialogState['dialog']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setUserLoading(true));
    const { email, password } = user;
    try {
        const uid = await authAPI.signup(email, password);
        await userAPI.addUser(uid, user);
        dispatch(setUser(user));
        dispatch(setSnackBar('success', '新規登録しました'));
    } catch (e) {
        dispatch(setUserLoading(false));
        dispatch(setSnackBar('error', '新規登録に失敗しました'));
        console.error(`Fail setting signup user to state because:${e}`);
    }
}

export const asyncLogin = (user: LoginDialogState['dialog']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setUserLoading(true));
    const { email, password } = user;
    try {
        const uid = await authAPI.login(email, password);
        const loginUser = await userAPI.fetchUser(uid);
        dispatch(setUser(loginUser));
        dispatch(setSnackBar('success', 'ログインしました'));
    } catch (e) {
        dispatch(setUserLoading(false));
        dispatch(setSnackBar('error', 'ログインに失敗しました'));
        console.error(`Fail setting login user to state because:${e}`);
    }
}

export const asyncLogout = (): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setUserLoading(true));
    try {
        await authAPI.logout();
        dispatch(resetUser());
        dispatch(setSnackBar('success', 'ログアウトしました'));
    } catch (e) {
        dispatch(setUserLoading(false));
        dispatch(setSnackBar('error', 'ログアウトに失敗しました'));
        console.error(`Fail resetting state of login user because:${e}`);
    }
}

export const asyncUpdate = (user: UpdateUserDialogState['user']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setUserLoading(true));
    const { email, password } = user;
    try {
        const uid = await authAPI.update(email, password);
        await userAPI.updateUser(uid, user);
        dispatch(setUser(user));
        dispatch(setSnackBar('success', 'ユーザー情報を更新しました'));
    } catch (e) {
        dispatch(setUserLoading(false));
        dispatch(setSnackBar('error', 'ユーザー情報の更新に失敗しました'));
        console.error(`Fail updating state of login user because:${e}`);
    }
}


