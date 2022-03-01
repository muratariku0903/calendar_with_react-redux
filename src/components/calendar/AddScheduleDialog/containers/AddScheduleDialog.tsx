import AddScheduleDialog from "../AddScheduleDialog";
import { connect } from 'react-redux';
import { DialogSchedule, Schedule, State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { closeAddScheduleDialog, setAddScheduleDialog } from "../../../../redux/actions/addScheduleDialog";
import { SetAddScheduleDialogForm } from "../../../../redux/actions/addScheduleDialog";
import { SchedulesActions } from "../../../../redux/actions/schedules";
import { asyncAddSchedule } from "../../../../redux/actions/effects/schedules";

const mapStateToProps = (store: State) => {
    return {
        dialog: store.addScheduleDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>) => {
    return {
        closeDialog: () => dispatch(closeAddScheduleDialog()),
        setDialogForm: (schedule: SetAddScheduleDialogForm) => dispatch(setAddScheduleDialog(schedule)),
        addSchedules: (schedule: DialogSchedule) => {
            dispatch(asyncAddSchedule(schedule));
            dispatch(closeAddScheduleDialog());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScheduleDialog);
