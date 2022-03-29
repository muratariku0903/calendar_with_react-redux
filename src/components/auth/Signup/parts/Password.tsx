import React, { useState } from 'react';
import { Grid, Input, Typography } from '@material-ui/core';
import { Lock as PasswordIcon } from '@material-ui/icons';
import { SignupDialogState } from '../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type OutterProps = {
    password: SignupDialogState['dialog']['password'];
    setDialog: (dialogItem: Partial<SignupDialogState['dialog']>) => void;
    errorMessage: string;
}

type AddUserDialogMailProps = OutterProps;

const Password: React.FC<AddUserDialogMailProps> = ({ password, setDialog, errorMessage }) => {
    const [isStartInput, setIsStartInput] = useState<boolean>(false);
    const isError = isStartInput && Boolean(errorMessage);
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
                    onBlur={() => setIsStartInput(true)}
                    placeholder='パスワード設定してください'
                    fullWidth
                    style={spacer}
                />
                <div>
                    {isError && (
                        <Typography variant="caption" component="div" color="error">{errorMessage}</Typography>
                    )}
                </div>
            </Grid>
        </Grid>
    );
}

export default Password;
