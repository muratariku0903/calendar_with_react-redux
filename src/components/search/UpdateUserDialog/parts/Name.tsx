import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startEditUpdateUserDialog } from '../../../../redux/actions/user/updateUserDialog';
import { Grid, Input } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { State, UpdateUserDialogState } from '../../../../redux/stateTypes';
import ErrorMessage from '../../../app/Dialog/ErrorMessage/ErrorMessage';

const spacer = { margin: '4px 0' };

type OutterProps = {
    name: UpdateUserDialogState['user']['name'];
    setDialog: (dialogItem: Partial<UpdateUserDialogState['user']>) => void;
    errorMessage: string;
}

type AddUserDialogNameProps = OutterProps;

const Name: React.FC<AddUserDialogNameProps> = ({ name, setDialog, errorMessage }) => {
    const dispatch = useDispatch();
    const isStartEdit = useSelector((state: State) => state.updateUserDialog.isStartEdit);
    const isError = isStartEdit && Boolean(errorMessage);
    return (
        <Grid container spacing={1} alignItems='center' justifyContent="space-between">
            <Grid item >
                <Person color='primary' />
            </Grid>
            <Grid item xs={10}>
                <Input
                    type="text"
                    value={name}
                    onChange={e => setDialog({ name: e.target.value })}
                    error={isError}
                    onBlur={() => dispatch(startEditUpdateUserDialog())}
                    placeholder="名前を入力してください"
                    autoFocus
                    fullWidth
                    style={spacer}
                />
                {isError && (<ErrorMessage errorMessage={errorMessage} />)}
            </Grid>
        </Grid>
    );
}

export default Name;
