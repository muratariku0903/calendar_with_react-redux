import React, { Fragment, useState } from 'react';
import { IconButton, Toolbar, Typography, withStyles, Tooltip, Drawer } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import DehazeIcon from '@material-ui/icons/Dehaze';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CalendarState } from '../../../redux/stateTypes';
import { getMonth } from '../../../services/calendar';

const drawerWidth = 240;

const useStyles = makeStyles(() => {
    return createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        }
    });
});


const StyledToolbar = withStyles({
    root: { padding: '0' }
})(Toolbar);

const StyledTypography = withStyles({
    root: { margin: '0 30px 0 10px' }
})(Typography);

const StyledDatePicker = withStyles({
    root: { marginLeft: '30' }
})(DatePicker);

export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
}

export type DispatchProps = {
    setMonth: (year: number, month: number) => void;
}

export type NavigationProps = StateProps & DispatchProps & {
    setPrevMonth: () => void;
    setNextMonth: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ year, month, setMonth, setPrevMonth, setNextMonth }) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const drawerOpen = () => setOpen(true);
    const drawerClose = () => setOpen(false);
    return (
        <Fragment>
            <StyledToolbar>
                <IconButton onClick={drawerOpen}>
                    <DehazeIcon />
                </IconButton>
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
            <Drawer
                className={classes.drawer}
                open={open}
                anchor='left'
                onClose={drawerClose}
                variant="persistent"
            >
                hello
            </Drawer>
        </Fragment>
    );
}

export default Navigation;
