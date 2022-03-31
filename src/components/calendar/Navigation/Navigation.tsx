import React from 'react';
import { IconButton, AppBar, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState, SideMenuState, UserState } from '../../../redux/stateTypes';
import MonthNavigation from './parts/MonthNavigation';
import UserMenu from './parts/UserMenu';
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
    year: CalendarState['year'];
    month: CalendarState['month'];
    isSideMenuOpen: SideMenuState['isOpen'];
    user: UserState;
}

export type DispatchProps = {
    setMonth: (year: number, month: number) => void;
    sideMenuOpen: () => void;
    logout: () => void;
}

export type NavigationProps = StateProps & DispatchProps & {
    setPrevMonth: () => void;
    setNextMonth: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ year, month, setMonth, setPrevMonth, setNextMonth, isSideMenuOpen, sideMenuOpen, user, logout }) => {
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
                <MonthNavigation year={year} month={month} setMonth={setMonth} setPrevMonth={setPrevMonth} setNextMonth={setNextMonth} />
                <div className={classes.grow} />
                <UserMenu user={user} logout={logout} />
            </StyledToolbar>
        </AppBar>
    );
}

export default Navigation;
