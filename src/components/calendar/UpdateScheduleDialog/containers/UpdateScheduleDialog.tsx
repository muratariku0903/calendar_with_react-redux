import UpdateScheduleDialog from '../UpdateScheduleDialog';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { MonthSchedules, Schedule, State, UpdateScheduleDialogState, ScheduleDate } from '../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../redux/actions/schedules';
import { asyncUpdateSchedule } from '../../../../redux/actions/effects/schedules';
import { closeUpdateScheduleDialog, setUpdateScheduleDialog } from '../../../../redux/actions/updateScheduleDialog';
import { getScheduleById } from '../../../../services/schedules';


export type StateProps = {
    dialog: UpdateScheduleDialogState;
    schedules: MonthSchedules;
};

const mapStateToProps = (state: State): StateProps => {
    return {
        dialog: state.updateScheduleDialog,
        schedules: state.schedules.dateSchedules,
    }
};


export type DispatchProps = {
    closeUpdateScheduleDialog: () => void;
    setUpdateScheduleDialog: (schedule: Schedule) => void;
    // こいつが前のDate情報を保持する必要がある。
    updateSchedule: (prevDate: ScheduleDate, schedule: Schedule) => void;
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        closeUpdateScheduleDialog: () => dispatch(closeUpdateScheduleDialog()),
        setUpdateScheduleDialog: (schedule: Schedule) => dispatch(setUpdateScheduleDialog(schedule)),
        updateSchedule: (prevDate: ScheduleDate, schedule: Schedule) => {
            dispatch(asyncUpdateSchedule(prevDate, schedule));
            dispatch(closeUpdateScheduleDialog());
        },
    }
}

export type Props = StateProps & DispatchProps & {
    updateSchedule: () => void;
}

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps): Props => {
    // この処理ってコンポーネントがレンダリングされたら実行されるようになってるけど、更新ボタンが押されたら実行されるべきな気がする。
    const prevSchedule = getScheduleById(stateProps.schedules, stateProps.dialog.schedule.id);
    const prevDate: ScheduleDate = prevSchedule ? prevSchedule.date : null;
    return {
        ...stateProps,
        ...dispatchProps,
        updateSchedule: () => dispatchProps.updateSchedule(prevDate, stateProps.dialog.schedule),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateScheduleDialog);
