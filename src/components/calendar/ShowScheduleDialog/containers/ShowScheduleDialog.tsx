import ShowScheduleDialog, { StateProps, DispatchProps, ShowScheduleDialogProps } from "../ShowScheduleDialog";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State, Schedule } from "../../../../redux/stateTypes";
import { SchedulesActions } from "../../../../redux/actions/schedules";
import { closeShowScheduleDialog } from "../../../../redux/actions/showScheduleDialog";
import { openUpdateScheduleDialog, setUpdateScheduleDialog } from '../../../../redux/actions/updateScheduleDialog';
import { asyncDeleteSchedule } from "../../../../redux/actions/effects/schedules";

const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.showScheduleDialog,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        closeDialog: () => dispatch(closeShowScheduleDialog()),
        deleteSchedule: (schedule: Schedule) => {
            dispatch(asyncDeleteSchedule(schedule));
            dispatch(closeShowScheduleDialog());
        },
        openUpdateScheduleDialog: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, schedule: Schedule) => {
            dispatch(closeShowScheduleDialog());
            e.stopPropagation();
            console.log(schedule);
            dispatch(setUpdateScheduleDialog(schedule));
            dispatch(openUpdateScheduleDialog());
        },
    }
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): ShowScheduleDialogProps => {
    return {
        ...stateProps,
        ...dispatchProps,
        deleteSchedule: () => dispatchProps.deleteSchedule(stateProps.dialog.schedule),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ShowScheduleDialog);
