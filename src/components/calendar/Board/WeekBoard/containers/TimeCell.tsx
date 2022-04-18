import TimeCell, { DispatchProps } from '../parts/TimeCell';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, Schedule, initialDialogForm } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../../redux/actions/calendar/addScheduleDialog';
import { asyncUpdateSchedule } from '../../../../../redux/actions/effects/schedules';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        openAddDialog: (time: Schedule['time']) => {
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: time.start, time }));
            dispatch(openAddScheduleDialog());
        },
        updateSchedule: (prevDate: Schedule['date'], schedule: Schedule): void => dispatch(asyncUpdateSchedule(prevDate, schedule)),
    }
}

export default connect(null, mapDispatchToProps)(TimeCell);
