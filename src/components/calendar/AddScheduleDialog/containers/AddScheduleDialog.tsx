import AddScheduleDialog from "../AddScheduleDialog";
import { connect } from 'react-redux';
import { Schedule, State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { closeAddScheduleDialog, openAddScheduleDialog, setAddScheduleDialog } from "../../../../redux/actions/addScheduleDialog";
import { SetAddScheduleDialogForm } from "../../../../redux/actions/addScheduleDialog";
import { addSchedules } from '../../../../redux/actions/schedules';
import { createSchedulesKey } from "../../../../services/schedules";

const mapStateToProps = (store: State) => {
    return {
        dialog: store.addScheduleDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        closeDialog: () => dispatch(closeAddScheduleDialog()),
        setDialogForm: (form: SetAddScheduleDialogForm) => dispatch(setAddScheduleDialog(form)),
        addSchedules: (schedule: Schedule) => {
            dispatch(addSchedules(createSchedulesKey(schedule.date), schedule));
            dispatch(closeAddScheduleDialog());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScheduleDialog);
