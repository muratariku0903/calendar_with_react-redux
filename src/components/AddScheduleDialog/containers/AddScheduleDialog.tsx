import AddScheduleDialog from "../AddScheduleDialog";
import { connect } from 'react-redux';
import { State } from "../../../redux/stateTypes";
import { Dispatch } from "redux";
import { closeAddScheduleDialog, openAddScheduleDialog, setAddScheduleDialog } from "../../../redux/actions/addScheduleDialog";
import { SetAddScheduleDialogForm } from "../../../redux/actions/addScheduleDialog";

const mapStateToProps = (store: State) => {
    return {
        dialog: store.addScheduleDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        closeDialog: () => dispatch(closeAddScheduleDialog()),
        setDialogForm: (form: SetAddScheduleDialogForm) => dispatch(setAddScheduleDialog(form)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScheduleDialog);
