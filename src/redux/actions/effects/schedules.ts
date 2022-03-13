import { fetchSchedules, addSchedules, deleteSchedule, setScheduleLoading, updateSchedule, SchedulesActions } from '../schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Schedule, State, DialogSchedule, ScheduleDate } from '../../stateTypes';
import { createSchedulesKey } from '../../../services/schedules';
import { isSameDay } from '../../../services/calendar';
import { schedulesAPI } from '../../../firebase/api/schedules';


type SchedulesThunkAction = ThunkAction<void, State, undefined, SchedulesActions>;

// reducerに伝達する本来のアクションよりも前に処理するアクションってこと。つまり、アクションとreducerの間のeffectということ。
// 前月の予定とかも表示させたい
export const asyncFetchSchedules = (year: number, month: number): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    try {
        const schedules = await schedulesAPI.fetchSchedules(year, month);
        dispatch(fetchSchedules(schedules));
    } catch (e) {
        console.log('Error fetching docs', e);
    }
}

export const asyncAddSchedule = (form: DialogSchedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    try {
        const id = await schedulesAPI.addSchedule(form);
        console.log('Document written.');
        dispatch(addSchedules(createSchedulesKey(form.date), form, id));
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const asyncDeleteSchedule = (schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    try {
        await schedulesAPI.deleteSchedule(schedule);
        dispatch(deleteSchedule(createSchedulesKey(schedule.date), schedule.id));
        console.log('Success delete.');
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export const asyncUpdateSchedule = (prevDate: ScheduleDate, schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    const { id, date } = schedule;
    try {
        await schedulesAPI.updateSchedule(schedule);
        console.log('Success update.');
        if (isSameDay(date, prevDate)) {
            dispatch(updateSchedule(id, createSchedulesKey(date), schedule));
        } else {
            dispatch(deleteSchedule(createSchedulesKey(prevDate), id));
            dispatch(addSchedules(createSchedulesKey(date), schedule, id));
        }
    } catch (e) {
        console.error("Error updating document.", e);
    }
}
