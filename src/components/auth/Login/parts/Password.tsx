import React from 'react';
import { Grid, Input } from '@material-ui/core';
import { Lock as PasswordIcon } from '@material-ui/icons';
import { LoginDialogState } from '../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type OutterProps = {
    password: LoginDialogState['dialog']['password'];
    setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => void;
}

type LoginDialogMailProps = OutterProps;

const Password: React.FC<LoginDialogMailProps> = ({ password, setDialog }) => {
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
                    placeholder='パスワードを入力してください'
                    fullWidth
                    style={spacer}
                />
            </Grid>
        </Grid>
    );
}

export default Password;
