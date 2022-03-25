import Date, { DispatchProps } from '../Date';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, Schedule } from '../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../redux/actions/schedules';
import { asyncUpdateSchedule } from '../../../../redux/actions/effects/schedules';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        updateSchedule: (prevDate: Schedule['date'], schedule: Schedule): void => dispatch(asyncUpdateSchedule(prevDate, schedule)),
    }
}

export default connect(null, mapDispatchToProps)(Date);
