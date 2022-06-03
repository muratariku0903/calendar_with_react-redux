import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Grid } from '@material-ui/core';
import { Title as TitleIcon } from "@material-ui/icons";
import { withStyles } from '@material-ui/styles';
import { State,  EmailScheduleDialogState } from '../../../../../redux/stateTypes';
import ErrorMessage from '../../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '10px 0' };

const Title = withStyles({
    root: {
        marginBottom: '32',
        fontSize: '22'
    }
})(Input);

export type OutterProps = {
    emailTitle: EmailScheduleDialogState['form']['emailTitle'];
    setDialogForm: (updateItem: Partial<EmailScheduleDialogState['form']>) => void;
    errorMessage: string;
}


type EmailScheduleDialogTitleProps = OutterProps;

const EmailScheduleDialogTitle: React.FC<EmailScheduleDialogTitleProps> = ({ emailTitle, setDialogForm, errorMessage }) => {
    const isStartEdit = useSelector((state: State) => state.emailScheduleDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item>
                <TitleIcon />
            </Grid>
            <Grid item xs={10}>
                <Title
                    value={emailTitle}
                    onChange={e => setDialogForm({ emailTitle: e.target.value })}
                    error={isError}
                    autoFocus
                    fullWidth
                    style={spacer}
                    placeholder="件名"
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default EmailScheduleDialogTitle;
