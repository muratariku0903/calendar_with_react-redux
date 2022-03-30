import { setSchedules, addSchedules, deleteSchedule, setScheduleLoading, updateSchedule, SchedulesActions } from '../calendar/schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Schedule, State, DialogSchedule } from '../../stateTypes';
import { createSchedulesKey } from '../../../services/schedules';
import { isSameDay } from '../../../services/calendar';
import { schedulesAPI } from '../../../firebase/api/schedules';
import { setSnackBar } from '../app/snackBar';


type SchedulesThunkAction = ThunkAction<void, State, undefined, SchedulesActions>;

export const asyncFetchSchedules = (year: number, month: number): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading(true));
    try {
        const schedules = await schedulesAPI.fetchSchedules(year, month);
        dispatch(setSchedules(schedules));
    } catch (e) {
        dispatch(setScheduleLoading(false));
        dispatch(setSnackBar('error', '予定の取得に失敗しました'));
        console.error(`Error setting schedules to state because:${e}`);
    }
}

export const asyncAddSchedule = (form: DialogSchedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading(true));
    try {
        const id = await schedulesAPI.addSchedule(form);
        dispatch(addSchedules(createSchedulesKey(form.date), form, id));
        dispatch(setSnackBar('success', '予定を追加しました'));
    } catch (e) {
        dispatch(setScheduleLoading(false));
        dispatch(setSnackBar('error', '予定の追加に失敗しました'));
        console.error(`Error adding schedule to state because:${e}`);
    }
}

export const asyncDeleteSchedule = (schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading(true));
    const { id, date } = schedule;
    try {
        await schedulesAPI.deleteSchedule(schedule);
        dispatch(deleteSchedule(createSchedulesKey(date), id));
        dispatch(setSnackBar('success', '予定を削除しました'));
    } catch (e) {
        dispatch(setScheduleLoading(false));
        dispatch(setSnackBar('error', '予定の削除に失敗しました'));
        console.error(`Error deleting schedule of state because:${e}`);
    }
}

export const asyncUpdateSchedule = (prevDate: Schedule['date'], schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading(true));
    const { id, date } = schedule;
    try {
        await schedulesAPI.updateSchedule(prevDate, schedule);
        if (isSameDay(date, prevDate)) {
            dispatch(updateSchedule(id, createSchedulesKey(date), schedule));
        } else {
            dispatch(deleteSchedule(createSchedulesKey(prevDate), id));
            dispatch(addSchedules(createSchedulesKey(date), schedule, id));
        }
        dispatch(setSnackBar('success', '予定を更新しました'));
    } catch (e) {
        dispatch(setScheduleLoading(false));
        dispatch(setSnackBar('error', '予定の更新に失敗しました'));
        console.error(`Error updating schedule of state because:${e}`);
    }
}
