import CalendarLoader, { StateProps } from "../Loader";
import { connect } from "react-redux";
import { State } from "../../../../redux/stateTypes";


const mapStateToProps = (state: State): StateProps => {
    return {
        isOpenLoader: state.schedules.isLoading || state.holidays.isLoading || state.user.isLoading || state.emailScheduleDialog.isLoading || state.loader.isShow
    };
};


export default connect(mapStateToProps)(CalendarLoader);
