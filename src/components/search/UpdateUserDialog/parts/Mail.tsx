import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startEditUpdateUserDialog } from '../../../../redux/actions/user/updateUserDialog';
import { Grid, Input } from '@material-ui/core';
import { Mail as MailIcon } from '@material-ui/icons';
import { State, UpdateUserDialogState } from '../../../../redux/stateTypes';
import ErrorMessage from '../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '4px 0' };

type OutterProps = {
    mail: UpdateUserDialogState['user']['email'];
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
    errorMessage: string;
}

type AddUserDialogMailProps = OutterProps;

const Mail: React.FC<AddUserDialogMailProps> = ({ mail, setDialog, errorMessage }) => {
    const dispatch = useDispatch();
    const isStartEdit = useSelector((state: State) => state.updateUserDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);
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
                    onBlur={() => dispatch(startEditUpdateUserDialog())}
                    placeholder='メールアドレスを入力してくだい'
                    fullWidth
                    style={spacer}
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default Mail;
