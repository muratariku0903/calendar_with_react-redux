import ShowScheduleDialog from "../ShowScheduleDialog";
import { connect } from 'react-redux';
import { State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { closeShowScheduleDialog } from "../../../../redux/actions/showScheduleDialog";

const mapStateToProps = (state: State) => {
    return {
        dialog: state.showScheduleDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        closeDialog: () => dispatch(closeShowScheduleDialog()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowScheduleDialog);
