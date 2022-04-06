import WeekBoard, { StateProps, DispatchProps, WeekBoardProps } from '../WeekBoard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, initialDialogForm, Schedule } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { HolidaysActions } from '../../../../../redux/actions/calendar/holidays';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../../redux/actions/calendar/addScheduleDialog';
import { getCalendarWeekDates } from '../../../../../redux/selectors';


const mapStateToProps = (state: State): StateProps => {
    return {
        year: state.calendar.year,
        month: state.calendar.month,
        dates: getCalendarWeekDates(state),
        isSideMenuOpen: state.sideMenu.isOpen,
    };
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions & HolidaysActions>): DispatchProps => {
    return {
        openAddDialog: (date: Schedule['date']) => {
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: date }));
            dispatch(openAddScheduleDialog());
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): WeekBoardProps => {
    return {
        ...stateProps,
        ...dispatchProps,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WeekBoard);
