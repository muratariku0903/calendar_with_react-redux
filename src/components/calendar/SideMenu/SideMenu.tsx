import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Drawer, Divider, Button, Tooltip } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Add } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { CalendarState, SideMenuState, Schedule } from '../../../redux/stateTypes';
import { getMonth } from '../../../services/calendar';
import { headerHeight, sideMenuWidth } from '../../../constants';
import dayjs, { Dayjs } from 'dayjs';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        drawer: {
            width: sideMenuWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
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
            borderRadius: '0',
            width: sideMenuWidth,
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
    const classes = useStyles();
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
                onChange={d => d ? setSelectedDate(d) : alert('正しい日付を入力してください')}
                format="YYYY年 M月"
                variant='static'
                animateYearScrolling
                disableToolbar
            />
        </Drawer>
    );
}

export default SideMenu;
