import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, AppBar, Toolbar, Typography, withStyles, Tooltip, Button, Menu, MenuItem } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { customPickerTheme } from './customPickerTheme';
import { ArrowBackIos, ArrowForwardIos, AccountCircle } from "@material-ui/icons";
import { makeStyles, createStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState, SideMenuState, UserState } from '../../../redux/stateTypes';
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
        grow: {
            flexGrow: 1,
        },
        desktop: {
            marginRight: '10px',
            display: 'flex',
            alignItems: 'center',
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
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
        <AppBar position='static'>
            <StyledToolbar className={isSideMenuOpen ? classes.navigationShift : classes.navigation}>
                <Tooltip title='メニュー' placement='bottom'>
                    <IconButton disabled={isSideMenuOpen} onClick={sideMenuOpen}>
                        <DehazeIcon style={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <StyledTypography variant="h6">カレンダー</StyledTypography>
                <Tooltip title='前月' placement='bottom'>
                    <IconButton size="small" onClick={setPrevMonth}>
                        <ArrowBackIos style={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <ThemeProvider theme={customPickerTheme}>
                    <DatePicker
                        value={getMonth(year, month)}
                        onChange={d => d ? setMonth(d.year(), d.month() + 1) : alert('正しい日付を入力してください')}
                        format="YYYY年 M月"
                        variant='inline'
                        animateYearScrolling disableToolbar
                    />
                </ThemeProvider>
                <Tooltip title='次月' placement='bottom'>
                    <IconButton size="small" onClick={setNextMonth}>
                        <ArrowForwardIos style={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <div className={classes.grow} />
                {user.isLogin && (
                    <div className={classes.desktop}>
                        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <AccountCircle style={{ marginRight: '5px', color: 'white' }} />
                        </IconButton>
                        <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
                            <MenuItem onClick={() => navigate('user')}>プロフィール</MenuItem>
                        </Menu>
                        <Button color="inherit" onClick={logout}>ログアウト</Button>
                    </div>
                )}
            </StyledToolbar>
        </AppBar>
    );
}

export default Navigation;
