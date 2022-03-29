import React, { useState } from 'react';
import { Grid, Input, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import { SignupDialogState } from '../../../../redux/stateTypes';

const spacer = { margin: '4px 0' };

type OutterProps = {
    name: SignupDialogState['dialog']['name'];
    setDialog: (dialogItem: Partial<SignupDialogState['dialog']>) => void;
}

type AddUserDialogNameProps = OutterProps;

const Name: React.FC<AddUserDialogNameProps> = ({ name, setDialog }) => {
    const [isStartInput, setIsStartInput] = useState<boolean>(false);
    const isError = isStartInput && !name;
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
                    onBlur={() => setIsStartInput(true)}
                    placeholder="名前を入力してください"
                    autoFocus
                    fullWidth
                    style={spacer}
                />
                <div>
                    {isError && (
                        <Typography variant="caption" component="div" color="error">名前は必須です</Typography>
                    )}
                </div>
            </Grid>
        </Grid>
    );
}

export default Name;
