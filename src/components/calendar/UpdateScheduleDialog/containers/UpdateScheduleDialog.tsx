import UpdateScheduleDialog, { StateProps, DispatchProps, UpdateScheduleDialogProps } from '../UpdateScheduleDialog';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { DialogSchedule, Schedule, State } from '../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../redux/actions/schedules';
import { asyncUpdateSchedule } from '../../../../redux/actions/effects/schedules';
import { closeUpdateScheduleDialog, setUpdateScheduleDialog, showUpdateScheduleDialogAlert } from '../../../../redux/actions/updateScheduleDialog';
import { getScheduleById } from '../../../../services/schedules';
import { isEmptyDialog } from '../../../../services/dialog';


const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.updateScheduleDialog,
        schedules: state.schedules.monthSchedules,
    }
};

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        closeUpdateScheduleDialog: () => dispatch(closeUpdateScheduleDialog()),
        setUpdateScheduleDialog: (schedule: Schedule) => dispatch(setUpdateScheduleDialog(schedule)),
        updateSchedule: (prevDate: Schedule['date'], schedule: Schedule) => {
            dispatch(asyncUpdateSchedule(prevDate, schedule));
            dispatch(closeUpdateScheduleDialog());
        },
        showAlert: () => dispatch(showUpdateScheduleDialogAlert(true)),
        closeAlert: () => dispatch(showUpdateScheduleDialogAlert(false)),
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): UpdateScheduleDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        isEmptyDialog: () => isEmptyDialog<DialogSchedule>(stateProps.dialog.schedule, ['date']),
        setUpdateDialog: (updateItem: Partial<Schedule>) => dispatchProps.setUpdateScheduleDialog({ ...stateProps.dialog.schedule, ...updateItem }),
        updateSchedule: () => {
            const prevSchedule = getScheduleById(stateProps.schedules, stateProps.dialog.schedule.id);
            const prevDate: Schedule['date'] = prevSchedule.date;
            dispatchProps.updateSchedule(prevDate, stateProps.dialog.schedule);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateScheduleDialog);
