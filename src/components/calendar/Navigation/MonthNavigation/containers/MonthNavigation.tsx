import MonthNavigation, { StateProps, DispatchProps, MonthNavigationProps } from "../MonthNavigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../../../../redux/stateTypes";
import { setMonth } from '../../../../../redux/actions/calendar/calendar';
import { SchedulesActions } from "../../../../../redux/actions/calendar/schedules";
import { HolidaysActions } from '../../../../../redux/actions/calendar/holidays';
import { asyncFetchSchedules } from '../../../../../redux/actions/effects/schedules';
import { asyncFetchHolidays } from '../../../../../redux/actions/effects/holidays';
import { getPrevMonth, getNextMonth } from "../../../../../services/calendar";

const mapStateToProps = (store: State): StateProps => {
    return {
        year: store.calendar.year,
        month: store.calendar.month,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions & HolidaysActions>): DispatchProps => {
    return {
        setMonth: (year: number, month: number, firstDateOfWeek: number) => {
            dispatch(setMonth(year, month, firstDateOfWeek));
            dispatch(asyncFetchSchedules(year, month));
            dispatch(asyncFetchHolidays(year, month));
        },
    };
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): MonthNavigationProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        setPrevMonth: () => {
            const prevMonth = getPrevMonth(stateProps.year, stateProps.month);
            dispatchProps.setMonth(prevMonth.year(), prevMonth.month() + 1, prevMonth.day(0).date());
        },
        setNextMonth: () => {
            const nextMonth = getNextMonth(stateProps.year, stateProps.month);
            dispatchProps.setMonth(nextMonth.year(), nextMonth.month() + 1, nextMonth.day(0).date());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MonthNavigation);
