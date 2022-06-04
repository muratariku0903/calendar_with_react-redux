import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { MailOutline } from "@material-ui/icons";
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import { State, EmailScheduleDialogState } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';


export type OutterProps = {
    emailTos: EmailScheduleDialogState['form']['emailTos'];
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessage: string;
}


type EmailScheduleDialogEmailProps = OutterProps;

const EmailScheduleDialogEmail: React.FC<EmailScheduleDialogEmailProps> = ({ emailTos, setDialogForm, errorMessage }) => {
    const isStartEdit = useSelector((state: State) => state.emailScheduleDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <MailOutline />
            </Grid>
            <Grid item xs={10}>
                <ReactMultiEmail
                    placeholder='メールアドレス'
                    emails={emailTos}
                    onChange={(emails: string[]) => setDialogForm({ emailTos: emails })}
                    getLabel={(email: string, idx: number, removeEmail: (idx: number) => void) => {
                        return (
                            <div data-tag key={idx}>
                                {email}
                                <span data-tag-handle onClick={() => removeEmail(idx)}>×</span>
                            </div>
                        );
                    }}
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default EmailScheduleDialogEmail;
