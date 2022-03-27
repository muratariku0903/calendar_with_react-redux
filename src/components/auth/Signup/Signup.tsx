import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogActions, Button, Typography, DialogTitle, Divider } from '@material-ui/core';
import { State, SignupDialogState } from '../../../redux/stateTypes';
import SignupDialogForm from './parts/SignupDialogForm';


export type StateProps = {
    dialog: SignupDialogState['dialog'];
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
const Signup: React.FC<SignupProps> = ({ dialog, setDialog, signup }) => {
    const { isLogin } = useSelector<State>(state => state.user) as State['user'];

    if (isLogin) return <Navigate to='/' />;

    return (
        <Dialog open maxWidth="sm" fullWidth>
            <DialogTitle>新規登録</DialogTitle>
            <Divider />
            <DialogContent>
                <SignupDialogForm dialog={dialog} setDialog={setDialog} />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={signup} color="primary" disabled={false} variant="outlined">登録</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Signup;
