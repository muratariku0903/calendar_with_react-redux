import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle, Divider } from '@material-ui/core';
import { State, LoginDialogState } from '../../../redux/stateTypes';
import LoginDialogForm from './parts/LoginDialogForm';


export type StateProps = {
    dialog: LoginDialogState['dialog'];
}

export type DispatchProps = {
    setDialog: (dialog: LoginDialogState['dialog']) => void;
    login: (dialog: LoginDialogState['dialog']) => void;
}

export type LoginProps = StateProps & DispatchProps & {
    setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => void;
    login: () => void;
};

const Login: React.FC<LoginProps> = ({ dialog, setDialog, login }) => {
    const { isLogin } = useSelector<State>(state => state.user) as State['user'];

    if (isLogin) return <Navigate to='/' />;

    return (
        <Dialog open maxWidth="sm" fullWidth>
            <DialogTitle>ログイン</DialogTitle>
            <Divider />
            <DialogContent>
                <LoginDialogForm dialog={dialog} setDialog={setDialog} />
            </DialogContent>
            <Divider />
            <DialogActions>
                {/* //全て入力されてから押せるように */}
                <Button onClick={login} color="primary" disabled={false} variant="outlined">ログイン</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
