import React, { useState } from 'react';
import { Grid, Input, Typography } from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';
import { SignupDialogState } from '../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type OutterProps = {
    mail: SignupDialogState['dialog']['email'];
    setDialog: (dialogItem: Partial<SignupDialogState['dialog']>) => void;
    errorMessage: string;
}

type AddUserDialogMailProps = OutterProps;

const Mail: React.FC<AddUserDialogMailProps> = ({ mail, setDialog, errorMessage }) => {
    const [isStartInput, setIsStartInput] = useState<boolean>(false);
    const isError = isStartInput && Boolean(errorMessage);
    return (
        <Grid container spacing={1} alignItems='center' justifyContent="space-between">
            <Grid item >
                <MailIcon color='primary' />
            </Grid>
            <Grid item xs={10}>
                <Input
                    type="email"
                    value={mail}
                    onChange={e => setDialog({ email: e.target.value })}
                    error={isError}
                    onBlur={() => setIsStartInput(true)}
                    placeholder='メールアドレスを入力してくだい'
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

export default Mail;
