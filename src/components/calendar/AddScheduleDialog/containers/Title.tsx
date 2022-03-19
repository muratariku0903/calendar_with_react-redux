import Title, { DispatchProps, StateProps } from "../parts/Title";
import { connect } from 'react-redux';
import { State } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { startEditAddScheduleDialog } from "../../../../redux/actions/addScheduleDialog";


const mapStateToProps = (state: State): StateProps => {
    return {
        isStartEdit: state.addScheduleDialog.isStartEdit,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        setStartEdit: () => dispatch(startEditAddScheduleDialog())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Title);
