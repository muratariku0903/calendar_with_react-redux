import React from 'react';
import { IconButton, AppBar, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState, SideMenuState, UserState } from '../../../../redux/stateTypes';
import SetMonthNavigation from './parts/SetMonthNavigation';
import BoardTypeMenu from '../base/BoardTypeMenu';
import UserMenu from '../base/UserMenu';
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
    year: CalendarState['year'];
    month: CalendarState['month'];
    boardType: CalendarState['type'];
    isSideMenuOpen: SideMenuState['isOpen'];
    user: UserState;
}

export type DispatchProps = {
    setMonth: (year: number, month: number) => void;
    sideMenuOpen: () => void;
    logout: () => void;
    setBoardType: (type: CalendarState['type']) => void;
}

export type MonthNavigationProps = StateProps & DispatchProps & {
    setPrevMonth: () => void;
    setNextMonth: () => void;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({ year, month, setMonth, setPrevMonth, setNextMonth, isSideMenuOpen, sideMenuOpen, user, logout, boardType, setBoardType }) => {
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
                <SetMonthNavigation year={year} month={month} setMonth={setMonth} setPrevMonth={setPrevMonth} setNextMonth={setNextMonth} />
                <div className={classes.grow} />
                <BoardTypeMenu boardType={boardType} setBoardType={setBoardType} />
                <UserMenu user={user} logout={logout} />
            </StyledToolbar>
        </AppBar>
    );
}

export default MonthNavigation;