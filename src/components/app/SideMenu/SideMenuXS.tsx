import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, Drawer, Divider, Button, Tooltip, Paper, InputBase } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Add } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { State, Schedule } from '../../../redux/stateTypes';
import { setSnackBar } from '../../../redux/actions/app/snackBar';
import { getMonth} from '../../../services/calendar';
import { headerHeight } from '../../../constants';
import { useSideMenu } from '../../../hooks/sideMenu';
import dayjs, { Dayjs } from 'dayjs';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        drawer: {
            width: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        drawerPaper: {
            width: '100%',
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
            width: '100%',
            height: headerHeight,
            borderRadius: '0',
        },
        searchPaper: {
            display: 'flex',
            height: headerHeight,
            width: '100%',
            padding: '5px 10px',
            alignItems: 'center',
            borderRadius: 0,
        },
        searchInput: {
            flex: 1,
        },
        searchIconButton: {
            padding: 10,
        },
    });
});

export type DispatchProps = {
    openAddDialog: (date: Schedule['date']) => void;
}

export type SideMenuXSProps = DispatchProps;


const SideMenuXS: React.FC<SideMenuXSProps> = ({ openAddDialog }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const isFirstRendering = useRef<boolean>(true);
    const { year, month } = useSelector((state: State) => state.calendar);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [keyword, setKeyword] = useState<string>('');
    const { isSideMenuOpen, closeSideMenu } = useSideMenu();
    const goToSearchPage = (keyword: string): void => {
        if (keyword.trim() === '') return;

        navigation({
            pathname: '/search',
            search: `?keyword=${keyword}`,
        });
        closeSideMenu();
    }

    useEffect(() => {
        if (isFirstRendering.current) {
            isFirstRendering.current = false;
            return;
        } else {
            setSelectedDate(getMonth(year, month));
        }
    }, [year, month]);

    return (
        <Drawer
            className={classes.drawer}
            open={isSideMenuOpen}
            anchor='left'
            onClose={closeSideMenu}
            variant="persistent"
            classes={{ paper: classes.drawerPaper }}

        >
            <div className={classes.drawerHeader}>
                <Tooltip title='閉じる' placement='bottom' >
                    <IconButton onClick={closeSideMenu} className={classes.drawerCloseBtn} >
                        <ChevronLeftIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <Paper className={classes.searchPaper}>
                <InputBase
                    onChange={(e) => setKeyword(e.target.value)}
                    className={classes.searchInput}
                    placeholder="予定を検索"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Paper>
            <Divider />
            <Button
                onClick={() => goToSearchPage(keyword)}
                variant="outlined"
                color="primary"
                startIcon={<SearchIcon />}
                className={classes.addButton}
            >
                検索
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
        </Drawer>
    );
}


export default SideMenuXS;
