import ShowScheduleDialog from "../ShowScheduleDialog";
import { connect } from 'react-redux';
import { State, Schedule, ShowScheduleDialogState } from "../../../../redux/stateTypes";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { closeShowScheduleDialog } from "../../../../redux/actions/showScheduleDialog";
import { asyncDeleteSchedule } from "../../../../redux/actions/effects/schedules";
import { SchedulesActions } from "../../../../redux/actions/schedules";
import { openUpdateScheduleDialog, setUpdateScheduleDialog } from '../../../../redux/actions/updateScheduleDialog';

type StateProps = {
    dialog: ShowScheduleDialogState;
}

const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.showScheduleDialog,
    }
}

type DispatchProps = {
    closeDialog: () => void;
    deleteSchedule: (schedule: Schedule) => void;
    openUpdateScheduleDialog: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, schedule: Schedule) => void;
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        closeDialog: () => dispatch(closeShowScheduleDialog()),
        deleteSchedule: (schedule: Schedule) => {
            dispatch(asyncDeleteSchedule(schedule));
            dispatch(closeShowScheduleDialog());
        },
        openUpdateScheduleDialog: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, schedule: Schedule) => {
            e.stopPropagation();
            console.log(schedule);
            dispatch(closeShowScheduleDialog());
            dispatch(setUpdateScheduleDialog(schedule));
            dispatch(openUpdateScheduleDialog());
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        deleteSchedule: () => dispatchProps.deleteSchedule(stateProps.dialog.schedule),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ShowScheduleDialog);
