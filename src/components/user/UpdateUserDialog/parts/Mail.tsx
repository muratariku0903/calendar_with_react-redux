import React from 'react';
import { Grid, Input } from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';
import { UpdateUserDialogState } from '../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type OutterProps = {
    mail: UpdateUserDialogState['user']['email'];
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
}

type AddUserDialogMailProps = OutterProps;

const Mail: React.FC<AddUserDialogMailProps> = ({ mail, setDialog }) => {
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
