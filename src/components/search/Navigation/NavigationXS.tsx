import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { AccountCircle } from '@material-ui/icons';
import { useSideMenu } from '../../../hooks/sideMenu';
import { headerHeight } from '../../../constants';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        navigation: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: headerHeight,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        navigationShift: {
            width: 0,
            marginLeft: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        title: {
            marginRight: '5%',
        },
        grow: {
            flexGrow: 1,
        },
        iconButton: {
            padding: 10,
        },
    });
});


export type NavigationXSProps = {};

const NavigationXS: React.FC<NavigationXSProps> = ({ }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { isSideMenuOpen, openSideMenu } = useSideMenu();

    return (
        <AppBar position="static">
            <Toolbar className={isSideMenuOpen ? classes.navigationShift : classes.navigation}>
                <Tooltip title='メニュー' placement='bottom'>
                    <IconButton disabled={isSideMenuOpen} onClick={openSideMenu}>
                        <DehazeIcon style={{ color: isSideMenuOpen ? 'gray' : 'white' }} />
                    </IconButton>
                </Tooltip>
                <Typography className={classes.title} variant="h6">検索結果</Typography>
                <div className={classes.grow} />
                <Button color="inherit" onClick={() => navigate('/')}>戻る</Button>
                <IconButton onClick={() => navigate('/user')}>
                    <AccountCircle style={{ color: 'white' }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};


export default NavigationXS;

