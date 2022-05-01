import TimeCell, { DispatchProps } from '../parts/TimeCell';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, Schedule, initialDialogForm, SnackBarState } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../../redux/actions/calendar/addScheduleDialog';
import { asyncUpdateSchedule } from '../../../../../redux/actions/effects/schedules';
import { setSnackBar } from '../../../../../redux/actions/app/snackBar';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        openAddDialog: (time: Schedule['time']) => {
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: time.start, time }));
            dispatch(openAddScheduleDialog());
        },
        updateSchedule: (prevDate: Schedule['date'], schedule: Schedule): void => dispatch(asyncUpdateSchedule(prevDate, schedule)),
        openSnackBar: (errorMessage: SnackBarState['message']) => dispatch(setSnackBar('error', errorMessage)),
    }
}

export default connect(null, mapDispatchToProps)(TimeCell);
