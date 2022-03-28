import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';


const useStyles = makeStyles(() => {
    return createStyles({
        grow: {
            flexGrow: 1,
        },
    });
});


export type DispatchProps = {
    logout: () => void;
}

export type NavigationProps = DispatchProps;

const Navigation: React.FC<NavigationProps> = ({ logout }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">プロファイル</Typography>
                <div className={classes.grow} />
                <Button color="inherit" onClick={() => navigate('/')}>戻る</Button>
                <Button color="inherit" onClick={logout}>ログアウト</Button>
            </Toolbar>
        </AppBar>
    );
};


export default Navigation;

