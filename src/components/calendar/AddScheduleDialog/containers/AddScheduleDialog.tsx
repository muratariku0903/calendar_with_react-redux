import AddScheduleDialog, { AddScheduleDialogProps, DispatchProps, StateProps } from "../AddScheduleDialog";
import { connect } from 'react-redux';
import { DialogSchedule, State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { closeAddScheduleDialog, setAddScheduleDialog } from "../../../../redux/actions/addScheduleDialog";
import { SchedulesActions } from "../../../../redux/actions/schedules";
import { asyncAddSchedule } from "../../../../redux/actions/effects/schedules";

const mapStateToProps = (store: State): StateProps => {
    return {
        dialog: store.addScheduleDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        closeDialog: () => dispatch(closeAddScheduleDialog()),
        setDialogForm: (schedule: DialogSchedule) => dispatch(setAddScheduleDialog(schedule)),
        addSchedule: (schedule: DialogSchedule) => {
            dispatch(asyncAddSchedule(schedule));
            dispatch(closeAddScheduleDialog());
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): AddScheduleDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        addSchedule: () => dispatchProps.addSchedule(stateProps.dialog.schedule),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddScheduleDialog);
