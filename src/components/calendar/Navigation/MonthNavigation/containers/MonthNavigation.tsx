import MonthNavigation, { StateProps, DispatchProps, MonthNavigationProps } from "../MonthNavigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State, CalendarState } from "../../../../../redux/stateTypes";
import { setMonth, setType } from '../../../../../redux/actions/calendar/calendar';
import { SchedulesActions } from "../../../../../redux/actions/calendar/schedules";
import { HolidaysActions } from '../../../../../redux/actions/calendar/holidays';
import { asyncFetchSchedules } from '../../../../../redux/actions/effects/schedules';
import { asyncFetchHolidays } from '../../../../../redux/actions/effects/holidays';
import { asyncLogout } from '../../../../../redux/actions/effects/user';
import { openSideMenu } from "../../../../../redux/actions/calendar/sideMenu";
import { getPrevMonth, getNextMonth } from "../../../../../services/calendar";

const mapStateToProps = (store: State): StateProps => {
    return {
        year: store.calendar.year,
        month: store.calendar.month,
        boardType: store.calendar.type,
        isSideMenuOpen: store.sideMenu.isOpen,
        user: store.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions & HolidaysActions>): DispatchProps => {
    return {
        setMonth: (year: number, month: number) => {
            dispatch(setMonth(year, month));
            dispatch(asyncFetchSchedules(year, month));
            dispatch(asyncFetchHolidays(year, month));
        },
        sideMenuOpen: () => dispatch(openSideMenu()),
        logout: () => dispatch(asyncLogout()),
        setBoardType: (type: CalendarState['type']) => dispatch(setType(type)),
    };
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): MonthNavigationProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        setPrevMonth: () => {
            const prevDate = getPrevMonth(stateProps.year, stateProps.month);
            dispatchProps.setMonth(prevDate.year(), prevDate.month() + 1);
        },
        setNextMonth: () => {
            const nextDate = getNextMonth(stateProps.year, stateProps.month);
            dispatchProps.setMonth(nextDate.year(), nextDate.month() + 1);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MonthNavigation);
