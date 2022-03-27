import ErrorSnackbar, { StateProps, DispatchProps } from "../ErrorSnackbar";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from "../../../../redux/stateTypes";
import { setScheduleError } from "../../../../redux/actions/calendar/schedules";


const mapStateToProps = (state: State): StateProps => {
    return {
        // これってスケジュールのみにおけるエラーバーナの？アプリ全体の方が良くない？
        error: state.schedules.error
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        close: () => dispatch(setScheduleError(null))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar);
