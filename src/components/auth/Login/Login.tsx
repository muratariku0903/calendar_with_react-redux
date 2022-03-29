import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle, Divider } from '@material-ui/core';
import { LoginDialogState, UserState } from '../../../redux/stateTypes';
import LoginDialogForm from './parts/LoginDialogForm';
import { Validation } from '../../../services/validation';
import { rules } from '../constants';


export type StateProps = {
    dialog: LoginDialogState['dialog'];
    isLogin: UserState['isLogin'];
}

export type DispatchProps = {
    setDialog: (dialog: LoginDialogState['dialog']) => void;
    login: (dialog: LoginDialogState['dialog']) => void;
}

export type LoginProps = StateProps & DispatchProps & {
    setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => void;
    login: () => void;
};

const Login: React.FC<LoginProps> = ({ dialog, setDialog, login, isLogin }) => {
    const navigate = useNavigate();
    const validation = new Validation(rules);
    const validateErrorMessages = validation.validate(dialog);
    const isValid = validation.isEmptyErrorMessages(validateErrorMessages);

    if (isLogin) return <Navigate to='/' />;

    return (
        <Dialog open maxWidth="sm" fullWidth>
            <DialogTitle>ログイン</DialogTitle>
            <DialogActions>
                <Button onClick={() => navigate('/signup')} color="primary">新規登録</Button>
            </DialogActions>
            <Divider />
            <DialogContent>
                <LoginDialogForm dialog={dialog} setDialog={setDialog} validateErrorMessages={validateErrorMessages} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={login} color="primary" disabled={!isValid} variant="outlined">ログイン</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
