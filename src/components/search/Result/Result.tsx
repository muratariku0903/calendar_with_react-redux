import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, CardActions, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@material-ui/core';
import { Person, Email } from '@material-ui/icons';
import { UserState, UpdateUserDialogState } from '../../../redux/stateTypes';


const useStyles = makeStyles(() => {
    return createStyles({
        card: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    });
});


export type StateProps = {
    // user: UserState;
}

export type DispatchProps = {
    // openUpdateUserDialog: (user: UpdateUserDialogState['user']) => void;
};

export type ResultProps = StateProps & DispatchProps & {
    // openUpdateUserDialog: () => void;
};

const Result: React.FC<ResultProps> = ({ }) => {
    const classes = useStyles();

    return (
        <Card variant='outlined' className={classes.card}>
            {/* <CardHeader variant='h3' title="プロファイル" />
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <Email />
                        </ListItemIcon>
                        <ListItemText primary={email} />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Button onClick={openUpdateUserDialog} color="primary" variant="outlined">編集</Button>
            </CardActions> */}
        </Card>
    );
}

export default Result;
