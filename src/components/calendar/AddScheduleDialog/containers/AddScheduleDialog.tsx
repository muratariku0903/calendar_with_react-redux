import AddScheduleDialog, { AddScheduleDialogProps, DispatchProps, StateProps } from "../AddScheduleDialog";
import { connect } from 'react-redux';
import { DialogSchedule, State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { closeAddScheduleDialog, setAddScheduleDialog, showAddScheduleDialogAlert } from "../../../../redux/actions/addScheduleDialog";
import { SchedulesActions } from "../../../../redux/actions/schedules";
import { asyncAddSchedule } from "../../../../redux/actions/effects/schedules";
import { isEmptyDialog } from "../../../../services/dialog";

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
        // ダイアログの共通化コンポーネントを作るとしたらこれはadd独自の機能になる
        showAlert: () => dispatch(showAddScheduleDialogAlert(true)),
        closeAlert: () => dispatch(showAddScheduleDialogAlert(false)),
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): AddScheduleDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        isEmptyDialog: () => isEmptyDialog<DialogSchedule>(stateProps.dialog.schedule, ['date']),
        addSchedule: () => dispatchProps.addSchedule(stateProps.dialog.schedule),
        setDialogForm: (scheduleItem: Partial<DialogSchedule>) => dispatchProps.setDialogForm({ ...stateProps.dialog.schedule, ...scheduleItem })
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddScheduleDialog);
