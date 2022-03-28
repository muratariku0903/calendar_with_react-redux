import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { Schedule, SideMenuState } from '../../../redux/stateTypes';
import { CalendarDate } from '../../../redux/selectors';
import WeekHeader from './parts/WeekHeader';
import Date from './containers/Date';
import { sideMenuWidth } from '../../../constants';


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        grid: {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        },
        board: {
            width: '100%',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        boardShift: {
            width: `calc(100% - ${sideMenuWidth}px)`,
            marginLeft: sideMenuWidth - 8,// bodyのmargin分調整
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
    });
});

export type StateProps = {
    year: number;
    month: number;
    dates: CalendarDate[];
    isSideMenuOpen: SideMenuState['isOpen'];
}

export type DispatchProps = {
    openAddDialog: (date: Schedule['date']) => void;
    fetchSchedules: (year: number, month: number) => void;
    fetchHolidays: (year: number, month: number) => void;
}

export type BoardProps = StateProps & DispatchProps & {
    fetchSchedules: () => void;
    fetchHolidays: () => void;
}

const Board: React.FC<BoardProps> = ({ month, dates, openAddDialog, fetchHolidays, fetchSchedules, isSideMenuOpen }) => {
    const classes = useStyles();
    useEffect(() => {
        fetchSchedules();
        fetchHolidays();
    }, []);
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={isSideMenuOpen ? classes.boardShift : classes.board}>
                <WeekHeader />
                <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                    {dates.map((val, idx) => {
                        return (
                            <li key={idx} onClick={() => openAddDialog(val.date.unix())}>
                                <Date date={val.date} dateSchedules={val.dateSchedules} holiday={val.holiday} month={month} />
                            </li>
                        );
                    })}
                </GridList>
            </div>
        </DndProvider>
    );
}

export default Board;
