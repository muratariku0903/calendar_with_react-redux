import Date, { DispatchProps } from '../parts/Date';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, Schedule, initialDialogForm } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { asyncUpdateSchedule } from '../../../../../redux/actions/effects/schedules';
import { setAddScheduleDialog, openAddScheduleDialog } from '../../../../../redux/actions/calendar/addScheduleDialog';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        openAddDialog: (date: Schedule['date']) => {
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: date }));
            dispatch(openAddScheduleDialog());
        },
        updateSchedule: (prevDate: Schedule['date'], schedule: Schedule): void => dispatch(asyncUpdateSchedule(prevDate, schedule)),
    }
}

export default connect(null, mapDispatchToProps)(Date);
