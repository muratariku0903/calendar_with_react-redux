import Title, { DispatchProps, StateProps } from "../parts/Title";
import { connect } from 'react-redux';
import { State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { startEditUpdateScheduleDialog } from "../../../../redux/actions/calendar/updateScheduleDialog";


const mapStateToProps = (state: State): StateProps => {
    return {
        isStartEdit: state.updateScheduleDialog.isStartEdit,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        setStartEdit: () => dispatch(startEditUpdateScheduleDialog()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Title);
