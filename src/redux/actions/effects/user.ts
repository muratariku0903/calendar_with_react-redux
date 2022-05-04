import { setUser, resetUser, setUserLoading, UserActions } from '../user/user';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { State, SignupDialogState, LoginDialogState, UpdateUserDialogState } from '../../stateTypes';
import { setSnackBar } from '../app/snackBar';
import { userAPI } from '../../../firebase/api/user';
import { authAPI } from '../../../firebase/api/auth';
import { isAuthError } from '../../../firebase/types/authError';
import { translateAuthErrorMessage } from '../../../firebase/services/translate';


type UserThunkAction = ThunkAction<void, State, undefined, UserActions>;


export const asyncSignup = (user: SignupDialogState['dialog']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setUserLoading(true));
    const { email, password } = user;
    try {
        const uid = await authAPI.signup(email, password);
        await userAPI.addUser(uid, user);
        dispatch(setUser({ ...user, id: uid }));
        dispatch(setSnackBar('success', '新規登録しました'));
    } catch (e) {
        const isAuthErrorObj = isAuthError(e);
        dispatch(setSnackBar('error', `新規登録に失敗しました ${isAuthErrorObj ? translateAuthErrorMessage(e.code) : ''}`));
        console.error(`Fail setting signup user to state because :${isAuthErrorObj ? e.msg : e}`);
    } finally {
        dispatch(setUserLoading(false));
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
        const isAuthErrorObj = isAuthError(e);
        dispatch(setSnackBar('error', `ログインに失敗しました ${isAuthErrorObj ? translateAuthErrorMessage(e.code) : ''}`));
        console.error(`Fail setting login user to state because :${isAuthErrorObj ? e.msg : e}`);
    } finally {
        dispatch(setUserLoading(false));
    }
}

export const asyncLogout = (): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setUserLoading(true));
    try {
        await authAPI.logout();
        dispatch(resetUser());
        dispatch(setSnackBar('success', 'ログアウトしました'));
    } catch (e) {
        const isAuthErrorObj = isAuthError(e);
        dispatch(setSnackBar('error', `ログアウトに失敗しました ${isAuthErrorObj ? translateAuthErrorMessage(e.code) : ''}`));
        console.error(`Fail resetting state of login user because :${isAuthErrorObj ? e.msg : e}`);
    } finally {
        dispatch(setUserLoading(false));
    }
}

export const asyncUpdate = (user: UpdateUserDialogState['user']): UserThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setUserLoading(true));
    const { email, password } = user;
    try {
        const uid = await authAPI.update(email, password);
        const updatedUser = { ...user, id: uid };
        await userAPI.updateUser(uid, updatedUser);
        dispatch(setUser(updatedUser));
        dispatch(setSnackBar('success', 'ユーザー情報を更新しました'));
    } catch (e) {
        dispatch(setSnackBar('error', 'ユーザー情報の更新に失敗しました'));
        console.error(`Fail updating state of login user because:${e}`);
    } finally {
        dispatch(setUserLoading(false));
    }
}


