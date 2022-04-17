import BaseInputDialog, { DispatchProps, StateProps } from "../BaseInputDialog";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { State } from "../../../../../redux/stateTypes";
import { closeBaseInputDialog, showBaseInputDialogAlert } from "../../../../../redux/actions/calendar/baseInputDialog";

const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.baseInputDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        closeDialog: () => dispatch(closeBaseInputDialog()),
        showAlert: () => dispatch(showBaseInputDialogAlert(true)),
        closeAlert: () => dispatch(showBaseInputDialogAlert(false)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseInputDialog);
