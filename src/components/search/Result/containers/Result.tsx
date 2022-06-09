import Result, { DispatchProps } from '../Result';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, Schedule } from '../../../../redux/stateTypes';
import { UserActions } from '../../../../redux/actions/user/user';
import { setShowScheduleDialog, openShowScheduleDialog } from '../../../../redux/actions/calendar/showScheduleDialog';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, UserActions>): DispatchProps => {
    return {
        openShowScheduleDialog: (schedule: Schedule) => {
            dispatch(setShowScheduleDialog(schedule));
            dispatch(openShowScheduleDialog());
        },
    };
};


export default connect(null, mapDispatchToProps)(Result);
