import React from 'react';
import { IconButton, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState, SideMenuState } from '../../../redux/stateTypes';
import { getMonth } from '../../../services/calendar';
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
            marginLeft: sideMenuWidth - 8,// bodyのmargin分調整
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    })
})

const StyledToolbar = withStyles({
    root: { padding: '0' }
})(Toolbar);

const StyledTypography = withStyles({
    root: { margin: '0 30px 0 10px' }
})(Typography);

const StyledDatePicker = withStyles({
    root: { marginLeft: '60' }
})(DatePicker);

export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    isSideMenuOpen: SideMenuState['isOpen'];
}

export type DispatchProps = {
    setMonth: (year: number, month: number) => void;
    sideMenuOpen: () => void;
}

export type NavigationProps = StateProps & DispatchProps & {
    setPrevMonth: () => void;
    setNextMonth: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ year, month, setMonth, setPrevMonth, setNextMonth, isSideMenuOpen, sideMenuOpen }) => {
    const classes = useStyles();
    return (
        <StyledToolbar className={isSideMenuOpen ? classes.navigationShift : classes.navigation}>
            <Tooltip title='メニュー' placement='bottom'>
                <IconButton disabled={isSideMenuOpen} onClick={sideMenuOpen}>
                    <DehazeIcon />
                </IconButton>
            </Tooltip>
            <StyledTypography color="textSecondary" variant="h5">カレンダー</StyledTypography>
            <Tooltip title='前月' placement='bottom'>
                <IconButton size="small" onClick={setPrevMonth}>
                    <ArrowBackIos />
                </IconButton>
            </Tooltip>
            <Tooltip title='次月' placement='bottom'>
                <IconButton size="small" onClick={setNextMonth}>
                    <ArrowForwardIos />
                </IconButton>
            </Tooltip>
            <StyledDatePicker
                value={getMonth(year, month)}
                onChange={d => d ? setMonth(d.year(), d.month() + 1) : alert('正しい日付を入力してください')}
                format="YYYY年 M月"
                variant='inline'
                animateYearScrolling disableToolbar />
        </StyledToolbar>
    );
}

export default Navigation;
