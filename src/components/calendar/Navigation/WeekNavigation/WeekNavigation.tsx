import React from 'react';
import { IconButton, AppBar, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState, SideMenuState, UserState } from '../../../../redux/stateTypes';
// import SetMonthNavigation from './parts/SetMonthNavigation';
// import UserMenu from './parts/UserMenu';
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
    // year: CalendarState['year'];
    // month: CalendarState['month'];
    // isSideMenuOpen: SideMenuState['isOpen'];
    // user: UserState;
}

export type DispatchProps = {
    // setMonth: (year: number, month: number) => void;
    // sideMenuOpen: () => void;
    // logout: () => void;
}

export type WeekNavigationProps = StateProps & DispatchProps & {
    // setPrevMonth: () => void;
    // setNextMonth: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({  }) => {
    const classes = useStyles();
    return (
        <AppBar position='static'>
            hello
        </AppBar>
    );
}

export default WeekNavigation;
