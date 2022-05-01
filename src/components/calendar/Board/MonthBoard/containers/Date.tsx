import Date, {  DispatchProps } from '../parts/Date';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, Schedule, initialDialogForm, SnackBarState } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { asyncUpdateSchedule } from '../../../../../redux/actions/effects/schedules';
import { setAddScheduleDialog, openAddScheduleDialog } from '../../../../../redux/actions/calendar/addScheduleDialog';
import { setSnackBar } from '../../../../../redux/actions/app/snackBar';
import { getCurrHourAndCurrMinute } from '../../../../../services/calendar';
import dayjs from 'dayjs';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        openAddDialog: (date: Schedule['date']) => {
            const { hour, minute } = getCurrHourAndCurrMinute();
            const start = dayjs.unix(date).hour(hour).minute(minute).unix();
            const end = dayjs.unix(start).add(1, 'h').unix();
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: date, time: { start, end } }));
            dispatch(openAddScheduleDialog());
        },
        updateSchedule: (prevDate: Schedule['date'], schedule: Schedule): void => dispatch(asyncUpdateSchedule(prevDate, schedule)),
        openSnackBar: (errorMessage: SnackBarState['message']) => dispatch(setSnackBar('error', errorMessage)),
    }
}

export default connect(null, mapDispatchToProps)(Date);
