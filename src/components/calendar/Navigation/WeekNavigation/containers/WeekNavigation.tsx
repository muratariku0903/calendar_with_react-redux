import WeekNavigation, { StateProps, DispatchProps, WeekNavigationProps } from "../WeekNavigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../../../../redux/stateTypes";
import { setWeek } from '../../../../../redux/actions/calendar/calendar';
import { SchedulesActions } from "../../../../../redux/actions/calendar/schedules";
import { HolidaysActions } from '../../../../../redux/actions/calendar/holidays';
import { asyncFetchSchedules } from '../../../../../redux/actions/effects/schedules';
import { asyncFetchHolidays } from '../../../../../redux/actions/effects/holidays';
import dayjs from 'dayjs';

const mapStateToProps = (store: State): StateProps => {
    return {
        year: store.calendar.year,
        month: store.calendar.month,
        firstDateOfWeek: store.calendar.firstDateOfWeek,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions & HolidaysActions>): DispatchProps => {
    return {
        setWeek: (year: number, month: number, firstDateOfWeek: number) => {
            dispatch(setWeek(year, month, firstDateOfWeek));
            dispatch(asyncFetchSchedules(year, month));
            dispatch(asyncFetchHolidays(year, month));
        },
    };
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): WeekNavigationProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        setPrevWeek: () => {
            const prevFirstDateOfWeek = dayjs.unix(stateProps.firstDateOfWeek).subtract(7, 'day');
            dispatchProps.setWeek(prevFirstDateOfWeek.year(), prevFirstDateOfWeek.month() + 1, prevFirstDateOfWeek.unix());
        },
        setNextWeek: () => {
            const nextFirstDateOfWeek = dayjs.unix(stateProps.firstDateOfWeek).add(7, 'day');
            console.log(nextFirstDateOfWeek);
            dispatchProps.setWeek(nextFirstDateOfWeek.year(), nextFirstDateOfWeek.month() + 1, nextFirstDateOfWeek.unix());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WeekNavigation);