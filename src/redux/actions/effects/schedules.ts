import { setSchedules, addSchedules, deleteSchedule, setScheduleLoading, updateSchedule, SchedulesActions } from '../calendar/schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Schedule, State, DialogSchedule } from '../../stateTypes';
import { schedulesAPI } from '../../../firebase/api/schedules';
import { algoliaApi } from '../../../api/algolia/algoliaApi';
import { setSnackBar } from '../app/snackBar';
import { createSchedulesKey, getSchedulesByDate } from '../../../services/schedules';
import { isSameDay } from '../../../services/calendar';
import { ScheduleValidation } from '../../../services/Validation/scheduleValidation';
import dayjs from 'dayjs';

const validation = new ScheduleValidation();

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
        await algoliaApi.addSchedule({ id, ...form });
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
        await algoliaApi.deleteSchedule(id);
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
        await algoliaApi.updateSchedule(schedule);
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

export const asyncUpdateScheduleWithTimeValidate = (prevDate: Schedule['date'], newSchedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading(true));

    const { id, date } = newSchedule;
    const newScheduleDateKey = createSchedulesKey(date);
    const newScheduleYear = dayjs.unix(date).year();
    const newScheduleMonth = dayjs.unix(date).month();

    let isError = false;
    let monthSchedules = {};
    try {
        monthSchedules = await schedulesAPI.fetchSchedules(newScheduleYear, newScheduleMonth);
    } catch (e) {
        dispatch(setScheduleLoading(false));
        dispatch(setSnackBar('error', `予定の更新に失敗しました`));
        console.error(`Error updating schedule of state because:${e}`);
        isError = true;
    }

    if (isError) return;

    const dateSchedules = getSchedulesByDate(monthSchedules, newScheduleDateKey).filter(dateSchedule => dateSchedule.id != id);;
    const validationMessage = validation.validateTimeConflict('予定', newSchedule.time, dateSchedules);
    if (validationMessage) {
        dispatch(setScheduleLoading(false));
        dispatch(setSnackBar('error', validationMessage));
        return;
    }

    try {
        await schedulesAPI.updateSchedule(prevDate, newSchedule);
        await algoliaApi.updateSchedule(newSchedule);
        if (isSameDay(date, prevDate)) {
            dispatch(updateSchedule(id, newScheduleDateKey, newSchedule));
        } else {
            dispatch(deleteSchedule(createSchedulesKey(prevDate), id));
            dispatch(addSchedules(newScheduleDateKey, newSchedule, id));
        }
        dispatch(setSnackBar('success', '予定を更新しました'));
    } catch (e) {
        dispatch(setScheduleLoading(false));
        dispatch(setSnackBar('error', '予定の更新に失敗しました'));
        console.error(`Error updating schedule of state because:${e}`);
    }
}
