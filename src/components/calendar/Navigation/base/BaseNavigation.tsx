import React, { ReactNode } from 'react';
import { IconButton, AppBar, Toolbar, Typography, withStyles, Tooltip, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState, SideMenuState, UserState } from '../../../../redux/stateTypes';
import ScheduleSearchBar from '../../../app/Navigation/ScheduleSearchBar';
import BoardTypeMenu from '../../../app/Navigation/BoardTypeMenu';
import UserMenu from '../../../app/Navigation/UserMenu';
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


const BaseNavigation: React.FC<BaseNavigationProps> = ({ boardType, isSideMenuOpen, sideMenuOpen, logout, setBoardType, children }) => {
    const classes = useStyles();
    return (
        <AppBar position='static'>
            <StyledToolbar className={isSideMenuOpen ? classes.navigationShift : classes.navigation}>
                <Tooltip title='????????????' placement='bottom'>
                    <IconButton disabled={isSideMenuOpen} onClick={sideMenuOpen}>
                        <DehazeIcon style={{ color: isSideMenuOpen ? 'gray' : 'white' }} />
                    </IconButton>
                </Tooltip>
                <StyledTypography variant="h6">???????????????</StyledTypography>
                {children}
                <div className={classes.grow} />
                <ScheduleSearchBar />
                <BoardTypeMenu boardType={boardType} setBoardType={setBoardType} />
                <UserMenu />
                <Button color="inherit" onClick={logout}>???????????????</Button>
            </StyledToolbar>
        </AppBar>
    );
}

export default BaseNavigation;
