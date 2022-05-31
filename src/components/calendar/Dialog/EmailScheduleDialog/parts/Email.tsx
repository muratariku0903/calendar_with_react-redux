import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import { MailOutline } from "@material-ui/icons";
import { State, EmailScheduleDialogState } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';


export type OutterProps = {
    email: EmailScheduleDialogState['form']['email'];
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessage: string;
}


type EmailScheduleDialogEmailProps = OutterProps;

const EmailScheduleDialogEmail: React.FC<EmailScheduleDialogEmailProps> = ({ email, setDialogForm, errorMessage }) => {
    const isStartEdit = useSelector((state: State) => state.emailScheduleDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <MailOutline />
            </Grid>
            <Grid item xs={10}>
                <TextField
                    value={email}
                    onChange={e => setDialogForm({ email: e.target.value })}
                    error={isError}
                    autoFocus
                    fullWidth
                    placeholder="メールアドレス"
                    type="email"
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default EmailScheduleDialogEmail;
