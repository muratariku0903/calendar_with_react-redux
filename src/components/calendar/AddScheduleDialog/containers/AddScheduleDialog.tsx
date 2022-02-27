import AddScheduleDialog from "../AddScheduleDialog";
import { connect } from 'react-redux';
import { Schedule, State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { closeAddScheduleDialog, openAddScheduleDialog, setAddScheduleDialog } from "../../../../redux/actions/addScheduleDialog";
import { SetAddScheduleDialogForm } from "../../../../redux/actions/addScheduleDialog";
import { addSchedules } from '../../../../redux/actions/schedules';
import { createSchedulesKey } from "../../../../services/schedules";
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
        setDialogForm: (form: SetAddScheduleDialogForm) => dispatch(setAddScheduleDialog(form)),
        addSchedules: (schedule: Schedule) => {
            dispatch(asyncAddSchedule(schedule));
            dispatch(closeAddScheduleDialog());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScheduleDialog);
