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
        }
    });
});

type EmailScheduleDialogDescriptionProps = {
    description: EmailScheduleDialogState['form']['description'];
    setDialogForm: (item: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessage: string;
}

const EmailScheduleDialogDescription: React.FC<EmailScheduleDialogDescriptionProps> = ({ description, setDialogForm, errorMessage }) => {
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
                    value={description}
                    onChange={(e) => setDialogForm({ description: e.target.value })}
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

export default EmailScheduleDialogDescription;
