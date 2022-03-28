import React, { Fragment } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import { Person, Email } from '@material-ui/icons';
import { UserState } from '../../../redux/stateTypes';


const useStyles = makeStyles(() => {
    return createStyles({
        card: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        grow: {
            flexGrow: 1,
        },
    });
});


export type StateProps = {
    user: UserState;
}

export type DispatchProps = {
    logout: () => void;
}

export type ProfileProps = StateProps & DispatchProps;

const Profile: React.FC<ProfileProps> = ({ user: { isLogin, user: { name, email } }, logout }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    if (!isLogin) return <Navigate to='/login' />;

    return (
        <Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">プロファイル</Typography>
                    <div className={classes.grow} />
                    <Button color="inherit" onClick={() => navigate('/')}>戻る</Button>
                    <Button color="inherit" onClick={logout}>ログアウト</Button>
                </Toolbar>
            </AppBar>
            <Card variant='outlined' className={classes.card}>
                <CardHeader variant='h3' title="プロファイル" />
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
            </Card>
        </Fragment>
    );
}

export default Profile;
