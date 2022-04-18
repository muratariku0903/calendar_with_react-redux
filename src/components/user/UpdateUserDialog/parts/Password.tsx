import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startEditUpdateUserDialog } from '../../../../redux/actions/user/updateUserDialog';
import { Grid, Input } from '@material-ui/core';
import { Lock as PasswordIcon } from '@material-ui/icons';
import { State, UpdateUserDialogState } from '../../../../redux/stateTypes';
import ErrorMessage from '../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '4px 0' };

type OutterProps = {
    password: UpdateUserDialogState['user']['password'];
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
    errorMessage: string;
}

type AddUserDialogMailProps = OutterProps;

const Password: React.FC<AddUserDialogMailProps> = ({ password, setDialog, errorMessage }) => {
    const dispatch = useDispatch();
    const isStartEdit = useSelector((state: State) => state.updateUserDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);
    return (
        <Grid container spacing={1} alignItems='center' justifyContent="space-between">
            <Grid item >
                <PasswordIcon color='primary' />
            </Grid>
            <Grid item xs={10}>
                <Input
                    type="password"
                    value={password}
                    onChange={e => setDialog({ password: e.target.value })}
                    error={isError}
                    onBlur={() => dispatch(startEditUpdateUserDialog())}
                    placeholder='パスワード設定してください'
                    fullWidth
                    style={spacer}
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default Password;
