import Navigation from "../Navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../../../redux/stateTypes";
import { setMonth } from '../../../../redux/actions/calendar';
import { SchedulesActions } from "../../../../redux/actions/schedules";
import { HolidaysActions } from '../../../../redux/actions/holidays';
import { asyncFetchSchedules } from '../../../../redux/actions/effects/schedules';
import { asyncFetchHolidays } from '../../../../redux/actions/effects/holidays';

const mapStateToProps = (store: State) => {
    return {
        currentYear: store.calendar.year,
        currentMonth: store.calendar.month,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions & HolidaysActions>) => {
    return {
        setMonth: (year: number, month: number) => {
            dispatch(setMonth(year, month));
            dispatch(asyncFetchSchedules(year, month));
            dispatch(asyncFetchHolidays(year, month));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
