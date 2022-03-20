import { setSchedules, addSchedules, deleteSchedule, setScheduleLoading, setScheduleError, updateSchedule, SchedulesActions } from '../schedules';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Schedule, State, DialogSchedule } from '../../stateTypes';
import { createSchedulesKey } from '../../../services/schedules';
import { isSameDay } from '../../../services/calendar';
import { schedulesAPI } from '../../../firebase/api/schedules';


type SchedulesThunkAction = ThunkAction<void, State, undefined, SchedulesActions>;

export const asyncFetchSchedules = (year: number, month: number): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    await schedulesAPI.fetchSchedules(year, month)
        .then(schedules => {
            dispatch(setSchedules(schedules));
            console.log('Set schedules to state.');
        }).catch(e => {
            console.error('Error setting schedules to state because:', e);
            dispatch(setScheduleError(String(e)));
        });
}

export const asyncAddSchedule = (form: DialogSchedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    try {
        const id = await schedulesAPI.addSchedule(form);
        console.log('Add schedule to state.', id);
        dispatch(addSchedules(createSchedulesKey(form.date), form, id));
    } catch (e) {
        console.error("Error adding schedule to state because: ", e);
        dispatch(setScheduleError(String(e)));
    }
}

export const asyncDeleteSchedule = (schedule: Schedule): SchedulesThunkAction => async (dispatch: Dispatch<Action>) => {
    dispatch(setScheduleLoading());
    try {
        await schedulesAPI.deleteSchedule(schedule);
        dispatch(deleteSchedule(createSchedulesKey(schedule.date), schedule.id));
        console.log('Delete schedule of state.');
    } catch (e) {
        console.error("Error deleting schedule of state because: ", e);
        dispatch(setScheduleError(String(e)));
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
        console.error("Error updating schedule of state because:", e);
        dispatch(setScheduleError(String(e)));
    }
}
