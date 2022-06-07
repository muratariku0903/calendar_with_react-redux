import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, AppBar, Tooltip, InputBase, Toolbar, Button, IconButton, Paper,withStyles } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { State } from '../../../redux/stateTypes';
import { openSideMenu } from '../../../redux/actions/calendar/sideMenu';
import UserMenu from '../../app/Navigation/UserMenu';
import { useLogout } from '../../../hooks/auth';
import { sideMenuWidth } from '../../../constants';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        navigation: {
            width: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        navigationShift: {
            width: `calc(100% - ${sideMenuWidth}px)`,
            marginLeft: sideMenuWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        title: {
            marginRight: '5%',
        },
        paper: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '25%',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        grow: {
            flexGrow: 1,
        },
        iconButton: {
            padding: 10,
        },
    });
});

const StyledToolbar = withStyles({
    root: { padding: '0' }
})(Toolbar);


export type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = ({ }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const logout = useLogout();
    const isSideMenuOpen = useSelector((state: State) => state.sideMenu.isOpen);
    const dispatch = useDispatch();
    const sideMenuOpen = () => dispatch(openSideMenu());

    return (
        <AppBar position="static">
            <StyledToolbar className={isSideMenuOpen ? classes.navigationShift : classes.navigation}>
                <Tooltip title='メニュー' placement='bottom'>
                    <IconButton disabled={isSideMenuOpen} onClick={sideMenuOpen}>
                        <DehazeIcon style={{ color: isSideMenuOpen ? 'gray' : 'white' }} />
                    </IconButton>
                </Tooltip>
                <Typography className={classes.title} variant="h6">検索結果</Typography>
                <Paper className={classes.paper}>
                    <InputBase
                        className={classes.input}
                        placeholder="予定を検索"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <div className={classes.grow} />
                <Button color="inherit" onClick={() => navigate('/')}>戻る</Button>
                <UserMenu />
                <Button color="inherit" onClick={logout}>ログアウト</Button>
            </StyledToolbar>
        </AppBar>
    );
};


export default Navigation;

