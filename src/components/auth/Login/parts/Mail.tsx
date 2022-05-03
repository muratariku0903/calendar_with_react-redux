import React, { useState } from 'react';
import { Grid, Input } from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';
import { LoginDialogState } from '../../../../redux/stateTypes';
import ErrorMessage from '../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '4px 0' };

type OutterProps = {
    mail: LoginDialogState['dialog']['email'];
    setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => void;
    errorMessage: string;
}

type LoginDialogMailProps = OutterProps;

const Mail: React.FC<LoginDialogMailProps> = ({ mail, setDialog, errorMessage }) => {
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
                    autoFocus
                    style={spacer}
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default Mail;
