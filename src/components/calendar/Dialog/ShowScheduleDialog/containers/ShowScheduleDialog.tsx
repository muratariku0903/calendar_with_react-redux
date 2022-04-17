import ShowScheduleDialog, { StateProps, DispatchProps, ShowScheduleDialogProps } from "../ShowScheduleDialog";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State, Schedule } from "../../../../../redux/stateTypes";
import { SchedulesActions } from "../../../../../redux/actions/calendar/schedules";
import { closeShowScheduleDialog } from "../../../../../redux/actions/calendar/showScheduleDialog";
import { openUpdateScheduleDialog, setUpdateScheduleDialog } from '../../../../../redux/actions/calendar/updateScheduleDialog';
import { asyncDeleteSchedule } from "../../../../../redux/actions/effects/schedules";
import { openBaseInputDialog } from "../../../../../redux/actions/calendar/baseInputDialog";

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
            e.stopPropagation();
            dispatch(closeShowScheduleDialog());
            dispatch(setUpdateScheduleDialog(schedule));
            dispatch(openBaseInputDialog());
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