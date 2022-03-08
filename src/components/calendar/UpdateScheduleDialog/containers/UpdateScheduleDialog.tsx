import UpdateScheduleDialog from '../UpdateScheduleDialog';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Schedule, State, UpdateScheduleDialogState } from '../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../redux/actions/schedules';
import { asyncUpdateSchedule } from '../../../../redux/actions/effects/schedules';
import { closeUpdateScheduleDialog } from '../../../../redux/actions/updateScheduleDialog';


export type StateProps = {
    dialog: UpdateScheduleDialogState;
};

const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.updateScheduleDialog,
    }
};


export type DispatchProps = {
    updateSchedule: (schedule: Schedule) => void;
    closeUpdateScheduleDialog: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        updateSchedule: (schedule: Schedule) => {
            dispatch(asyncUpdateSchedule(schedule));
            dispatch(closeUpdateScheduleDialog());
        },
        closeUpdateScheduleDialog: () => dispatch(closeUpdateScheduleDialog()),
    }
}

export type Props = StateProps & DispatchProps & {
    updateSchedule: () => void;
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): Props => {
    return {
        ...stateProps,
        ...dispatchProps,
        updateSchedule: () => dispatchProps.updateSchedule(stateProps.dialog.schedule),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateScheduleDialog);
