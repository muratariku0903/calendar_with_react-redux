import React, { ReactNode } from 'react';
import { IconButton, AppBar, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState, SideMenuState, UserState } from '../../../../redux/stateTypes';
import BoardTypeMenu from './parts/BoardTypeMenu';
import UserMenu from './parts/UserMenu';
import { sideMenuWidth } from '../../../../constants';


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
        grow: {
            flexGrow: 1,
        },
    });
});

const StyledToolbar = withStyles({
    root: { padding: '0' }
})(Toolbar);

const StyledTypography = withStyles({
    root: {
        margin: '0 30px 0 10px',
        color: 'white',
    }
})(Typography);

export type StateProps = {
    boardType: CalendarState['type'];
    isSideMenuOpen: SideMenuState['isOpen'];
    user: UserState;
}

export type DispatchProps = {
    sideMenuOpen: () => void;
    logout: () => void;
    setBoardType: (type: CalendarState['type']) => void;
}

export type ChildrenProps = {
    children: ReactNode;
}

export type BaseNavigationProps = StateProps & DispatchProps & ChildrenProps;


const BaseNavigation: React.FC<BaseNavigationProps> = ({ boardType, isSideMenuOpen, user, sideMenuOpen, logout, setBoardType, children }) => {
    const classes = useStyles();
    return (
        <AppBar position='static'>
            <StyledToolbar className={isSideMenuOpen ? classes.navigationShift : classes.navigation}>
                <Tooltip title='メニュー' placement='bottom'>
                    <IconButton disabled={isSideMenuOpen} onClick={sideMenuOpen}>
                        <DehazeIcon style={{ color: isSideMenuOpen ? 'gray' : 'white' }} />
                    </IconButton>
                </Tooltip>
                <StyledTypography variant="h6">カレンダー</StyledTypography>
                {children}
                <div className={classes.grow} />
                <BoardTypeMenu boardType={boardType} setBoardType={setBoardType} />
                <UserMenu user={user} logout={logout} />
            </StyledToolbar>
        </AppBar>
    );
}

export default BaseNavigation;
