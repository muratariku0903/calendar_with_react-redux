import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Chip, TextField } from '@material-ui/core';
import { MailOutline } from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';
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
                <Autocomplete
                    multiple
                    id="tags-filled"
                    freeSolo
                    options={emailTos}
                    onChange={(event, newValue) => setDialogForm({ emailTos: newValue })}
                    getOptionLabel={(option) => option}
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="filled" placeholder="メールアドレスを入力" />
                    )}
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default EmailScheduleDialogEmail;
