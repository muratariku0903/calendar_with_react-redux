import AddScheduleDialog, { AddScheduleDialogProps, DispatchProps, StateProps } from "../AddScheduleDialog";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { DialogSchedule, State } from "../../../../../redux/stateTypes";
import { setAddScheduleDialog, startEditAddScheduleDialog } from "../../../../../redux/actions/calendar/addScheduleDialog";
import { SchedulesActions } from "../../../../../redux/actions/calendar/schedules";
import { asyncAddSchedule } from "../../../../../redux/actions/effects/schedules";
import { isEmptyDialog } from "../../../../../services/dialog";
import { closeBaseInputDialog } from "../../../../../redux/actions/calendar/baseInputDialog";

const mapStateToProps = (store: State): StateProps => {
    return {
        dialog: store.addScheduleDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        setDialogForm: (schedule: DialogSchedule) => {
            dispatch(setAddScheduleDialog(schedule));
            dispatch(startEditAddScheduleDialog());
        },
        addSchedule: (schedule: DialogSchedule) => {
            dispatch(asyncAddSchedule(schedule));
            dispatch(closeBaseInputDialog());
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): AddScheduleDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        isEmptyDialog: () => isEmptyDialog<DialogSchedule>(stateProps.dialog.schedule, ['date', 'time']),
        addSchedule: () => dispatchProps.addSchedule(stateProps.dialog.schedule),
        setDialogForm: (scheduleItem: Partial<DialogSchedule>) => dispatchProps.setDialogForm({ ...stateProps.dialog.schedule, ...scheduleItem })
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddScheduleDialog);
