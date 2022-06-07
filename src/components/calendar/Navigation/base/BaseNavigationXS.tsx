import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, AppBar, Toolbar, withStyles, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AccountCircle } from "@material-ui/icons";
import DehazeIcon from '@material-ui/icons/Dehaze';
import { State, CalendarState } from '../../../../redux/stateTypes';
import BoardTypeMenu from '../../../app/Navigation/BoardTypeMenu';
import { sideMenuWidth } from '../../../../constants';
import { openSideMenu } from '../../../../redux/actions/calendar/sideMenu';
import { setType } from '../../../../redux/actions/calendar/calendar';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        navigation: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '64px',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        navigationShift: {
            width: 0,
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


export type ChildrenProps = {
    children: ReactNode;
}

export type BaseNavigationXSProps = ChildrenProps;


const BaseNavigationXS: React.FC<BaseNavigationXSProps> = ({ children }) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const boardType = useSelector((state: State) => state.calendar.type);
    const isSideMenuOpen = useSelector((state: State) => state.sideMenu.isOpen);
    const dispatch = useDispatch();
    const sideMenuOpen = () => dispatch(openSideMenu());
    const setBoardType = (type: CalendarState['type']) => dispatch(setType(type));

    return (
        <AppBar position='static'>
            <StyledToolbar className={isSideMenuOpen ? classes.navigationShift : classes.navigation}>
                <Tooltip title='メニュー' placement='bottom'>
                    <IconButton disabled={isSideMenuOpen} onClick={sideMenuOpen}>
                        <DehazeIcon style={{ color: isSideMenuOpen ? 'gray' : 'white' }} />
                    </IconButton>
                </Tooltip>
                {children}
                <BoardTypeMenu boardType={boardType} setBoardType={setBoardType} />
                <IconButton onClick={() => navigate('/user')}>
                    <AccountCircle style={{ color: 'white' }} />
                </IconButton>
            </StyledToolbar>
        </AppBar>
    );
}

export default BaseNavigationXS;
