import React from 'react';
import { Grid, Input } from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';
import { LoginDialogState } from '../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type OutterProps = {
    mail: LoginDialogState['dialog']['email'];
    setDialog: (dialogItem: Partial<LoginDialogState['dialog']>) => void;
}

type LoginDialogMailProps = OutterProps;

const Mail: React.FC<LoginDialogMailProps> = ({ mail, setDialog }) => {
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
                    placeholder='メールアドレスを入力してくだい'
                    fullWidth
                    style={spacer}
                />
            </Grid>
        </Grid>
    );
}

export default Mail;
