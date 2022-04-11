import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { Schedule, SideMenuState, CalendarState } from '../../../../redux/stateTypes';
import { CalendarDate } from '../../../../redux/selectors';
import WeekHeader from './parts/WeekHeader';
import Dates from './parts/Dates';
import { sideMenuWidth } from '../../../../constants';


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
            marginLeft: sideMenuWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
    });
});

export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    dates: CalendarDate[];
    isSideMenuOpen: SideMenuState['isOpen'];
}

export type DispatchProps = {
    openAddDialog: (date: Schedule['date']) => void;
    fetchSchedules: (year: number, month: number) => void;
    fetchHolidays: (year: number, month: number) => void;
}

export type MonthBoardProps = StateProps & DispatchProps & {
    fetchSchedules: () => void;
    fetchHolidays: () => void;
}

const MonthBoard: React.FC<MonthBoardProps> = ({ month, dates, openAddDialog, fetchHolidays, fetchSchedules, isSideMenuOpen }) => {
    const classes = useStyles();
    useEffect(() => {
        fetchSchedules();
        fetchHolidays();
    }, []);
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={isSideMenuOpen ? classes.boardShift : classes.board}>
                <GridList className={classes.grid} cols={7} spacing={0} cellHeight="auto">
                    {WeekHeader()}
                    {Dates(dates, openAddDialog, month)}
                </GridList>
            </div>
        </DndProvider>
    );
}

export default MonthBoard;
