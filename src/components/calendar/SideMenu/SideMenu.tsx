import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Drawer, Divider, Button, Tooltip, useMediaQuery } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Add } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CalendarState, SideMenuState, Schedule } from '../../../redux/stateTypes';
import { setSnackBar } from '../../../redux/actions/app/snackBar';
import { getMonth } from '../../../services/calendar';
import { headerHeight, breakpoints, sideMenuWidth } from '../../../constants';
import dayjs, { Dayjs } from 'dayjs';


type SideMenuStyleProps = {
    sideMenuWidth: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        drawer: {
            width: (props: SideMenuStyleProps) => props.sideMenuWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        drawerPaper: {
            width: (props: SideMenuStyleProps) => props.sideMenuWidth,
        },
        drawerHeader: {
            display: 'flex',
            height: headerHeight,
            marginLeft: 'auto',
        },
        drawerCloseBtn: {
            width: headerHeight,
            height: headerHeight,
        },
        addButton: {
            width: (props: SideMenuStyleProps) => props.sideMenuWidth,
            height: headerHeight,
            borderRadius: '0',
        }
    });
});

export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    isOpen: SideMenuState['isOpen'];
}

export type DispatchProps = {
    close: () => void;
    openAddDialog: (date: Schedule['date']) => void;
}

export type SideMenuProps = StateProps & DispatchProps;

const SideMenu: React.FC<SideMenuProps> = ({ year, month, isOpen, close, openAddDialog }) => {
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);
    const classes = useStyles({ sideMenuWidth: isSizeXS ? '100%' : `${sideMenuWidth}px` });
    const dispatch = useDispatch();
    const isFirstRendering = useRef<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    useEffect(() => {
        if (isFirstRendering.current) {
            isFirstRendering.current = false;
            return;
        } else {
            setSelectedDate(getMonth(year, month))
        }
    }, [year, month]);

    return (
        <Drawer
            className={classes.drawer}
            open={isOpen}
            anchor='left'
            onClose={close}
            variant="persistent"
            classes={{ paper: classes.drawerPaper }}
        >
            <div className={classes.drawerHeader}>
                <Tooltip title='閉じる' placement='bottom'>
                    <IconButton onClick={close} className={classes.drawerCloseBtn}>
                        <ChevronLeftIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <Button
                onClick={() => openAddDialog(selectedDate.unix())}
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                className={classes.addButton}
                disabled={!selectedDate}
            >
                作成
            </Button>
            <Divider />
            <DatePicker
                value={selectedDate}
                onChange={d => d ? setSelectedDate(d) : dispatch(setSnackBar('error', '正しい日付を選択してください'))}
                format="YYYY年 M月"
                variant='static'
                animateYearScrolling
                disableToolbar
            />
        </Drawer>
    );
}

export default SideMenu;
