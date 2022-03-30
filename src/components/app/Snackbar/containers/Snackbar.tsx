import SnackBar, { StateProps, DispatchProps } from "../Snackbar";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from "../../../../redux/stateTypes";
import { closeSnackBar } from "../../../../redux/actions/app/snackBar";


const mapStateToProps = (state: State): StateProps => {
    return {
        snackBar: state.snackBar,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        close: () => dispatch(closeSnackBar()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
