import { setSchedules, addSchedules, deleteSchedule, setScheduleLoading, updateSchedule, SchedulesActions } from '../schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Schedule, State, DialogSchedule } from '../../stateTypes';
import { createSchedulesKey } from '../../../services/schedules';
import { isSameDay } from '../../../services/calendar';
import { schedulesAPI } from '../../../firebase/api/schedules';


type SchedulesThunkAction = ThunkAction<void, State, undefined, SchedulesActions>;

// reducerに伝達する本来のアクションよりも前に処理するアクションってこと。つまり、アクションとreducerの間のeffectということ。
// 前月の予定とかも表示させたい
export const asyncFetchSchedules = (year: number, month: number): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    console.log('try fetching schedules');
    try {
        const schedules = await schedulesAPI.fetchSchedules(year, month);
        dispatch(setSchedules(schedules));
    } catch (e) {
        console.log('Error fetching schedules', e);
    }
}

export const asyncAddSchedule = (form: DialogSchedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    try {
        const id = await schedulesAPI.addSchedule(form);
        console.log('Schedule add to state.', id);
        dispatch(addSchedules(createSchedulesKey(form.date), form, id));
    } catch (e) {
        console.error("Error adding schedule of state.: ", e);
    }
}

export const asyncDeleteSchedule = (schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    try {
        await schedulesAPI.deleteSchedule(schedule);
        dispatch(deleteSchedule(createSchedulesKey(schedule.date), schedule.id));
        console.log('Schedule delete of state.');
    } catch (e) {
        console.error("Error deleting schedule of state.: ", e);
    }
}

export const asyncUpdateSchedule = (prevDate: Schedule['date'], schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    const { id, date } = schedule;
    try {
        await schedulesAPI.updateSchedule(prevDate, schedule);
        if (isSameDay(date, prevDate)) {
            dispatch(updateSchedule(id, createSchedulesKey(date), schedule));
        } else {
            dispatch(deleteSchedule(createSchedulesKey(prevDate), id));
            dispatch(addSchedules(createSchedulesKey(date), schedule, id));
        }
        console.log('Update schedule of state.');
    } catch (e) {
        console.error("Error updating schedule of state.", e);
    }
}
