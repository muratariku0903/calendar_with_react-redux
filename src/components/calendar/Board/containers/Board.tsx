import Board, { StateProps, DispatchProps, BoardProps } from '../Board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, initialDialogForm, Schedule } from '../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../redux/actions/schedules';
import { HolidaysActions } from '../../../../redux/actions/holidays';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../redux/actions/addScheduleDialog';
import { asyncFetchSchedules } from '../../../../redux/actions/effects/schedules';
import { asyncFetchHolidays } from '../../../../redux/actions/effects/holidays';
import { getCalendarDates } from '../../../../redux/selectors';


const mapStateToProps = (state: State): StateProps => {
    return {
        year: state.calendar.year,
        month: state.calendar.month,
        dates: getCalendarDates(state),
    };
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions & HolidaysActions>): DispatchProps => {
    return {
        openAddDialog: (date: Schedule['date']) => {
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: date }));
            dispatch(openAddScheduleDialog());
        },
        fetchSchedules: (year: number, month: number) => {
            dispatch(asyncFetchSchedules(year, month));
        },
        fetchHolidays: (year: number, month: number) => {
            dispatch(asyncFetchHolidays(year, month));
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): BoardProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        fetchSchedules: () => dispatchProps.fetchSchedules(stateProps.year, stateProps.month),
        fetchHolidays: () => dispatchProps.fetchHolidays(stateProps.year, stateProps.month),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Board);
