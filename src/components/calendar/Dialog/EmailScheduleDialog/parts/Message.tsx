import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, TextareaAutosize } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core';
import { NotesOutlined } from "@material-ui/icons";
import { State, EmailScheduleDialogState } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '10px 0' };

const useStyles = makeStyles(() => {
    return createStyles({
        textarea: {
            width: '100%',
            border: '1px solid rgba(0, 0, 0, 0.42)',
            padding: '10px',
            boxSizing: 'border-box',
            borderRadius: '0.28571429rem',
        }
    });
});

type EmailScheduleDialogMessageProps = {
    emailMessage: EmailScheduleDialogState['form']['emailMessage'];
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessage: string;
}

const EmailScheduleDialogMessage: React.FC<EmailScheduleDialogMessageProps> = ({ emailMessage, setDialogForm, errorMessage }) => {
    const classes = useStyles();
    const isStartEdit = useSelector((state: State) => state.emailScheduleDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <NotesOutlined />
            </Grid>
            <Grid item xs={10}>
                <TextareaAutosize
                    value={emailMessage}
                    onChange={(e) => setDialogForm({ emailMessage: e.target.value })}
                    style={spacer}
                    minRows={4}
                    placeholder="説明を追加"
                    className={classes.textarea}
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default EmailScheduleDialogMessage;
