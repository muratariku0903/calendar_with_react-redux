import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle, Divider } from '@material-ui/core';
import { SignupDialogState, UserState } from '../../../redux/stateTypes';
import SignupDialogForm from './parts/SignupDialogForm';
import { Validation } from '../../../services/validation';
import { rules } from '../constants';


export type StateProps = {
    dialog: SignupDialogState['dialog'];
    isLogin: UserState['isLogin'];
}

export type DispatchProps = {
    setDialog: (dialog: SignupDialogState['dialog']) => void;
    signup: (dialog: SignupDialogState['dialog']) => void;
}

export type SignupProps = StateProps & DispatchProps & {
    setDialog: (dialogItem: Partial<SignupDialogState['dialog']>) => void;
    signup: () => void;
};

// 間違えた人用に、ログインボタンを設置
const Signup: React.FC<SignupProps> = ({ dialog, setDialog, isLogin, signup }) => {
    const navigate = useNavigate();
    const validation = new Validation(rules);
    const validateErrorMessages = validation.validate<SignupDialogState['dialog']>(dialog);
    const isValid = validation.isEmptyErrorMessages(validateErrorMessages);

    if (isLogin) return <Navigate to='/' />;

    return (
        <Dialog open maxWidth="sm" fullWidth>
            <DialogTitle>新規登録</DialogTitle>
            <DialogActions>
                <Button onClick={() => navigate('/login')} color="primary">ログイン</Button>
            </DialogActions>
            <Divider />
            <DialogContent>
                <SignupDialogForm dialog={dialog} setDialog={setDialog} validateErrorMessages={validateErrorMessages} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={signup} color="primary" disabled={!isValid} variant="outlined">登録</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Signup;
