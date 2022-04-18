import Time, { StateProps } from "../parts/Time";
import { connect } from 'react-redux';
import { State } from "../../../../../redux/stateTypes";


const mapStateToProps = (state: State): StateProps => {
    return {
        isStartEdit: state.updateScheduleDialog.isStartEdit,
    };
};


export default connect(mapStateToProps)(Time);
