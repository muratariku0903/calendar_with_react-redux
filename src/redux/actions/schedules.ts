import { ActionTypes } from '../actionTypes';
import { MonthSchedules, Schedule } from '../stateTypes';

type AddSchedulesAction = {
    type: ActionTypes.ADD_SCHEDULES;
    payload: {
        schedule: Schedule,
        key: string,
    };
}

export const addSchedules = (key: string, schedule: Schedule): AddSchedulesAction => {
    return {
        type: ActionTypes.ADD_SCHEDULES,
        payload: {
            schedule: schedule,
            key: key,
        },
    }
}

type FetchSchedulesAction = {
    type: ActionTypes.FETCH_SCHEDULES;
    payload: Record<string, Schedule[]>;
}

export const fetchSchedules = (schedules: MonthSchedules): FetchSchedulesAction => {
    console.log('set schedules from firestore to schedules state');
    return {
        type: ActionTypes.FETCH_SCHEDULES,
        payload: schedules,
    }
}

type SetScheduleLoading = {
    type: ActionTypes.SET_SCHEDULES_LOADING;
}

export const setScheduleLoading = (): SetScheduleLoading => {
    return {
        type: ActionTypes.SET_SCHEDULES_LOADING
    }
}

export type SchedulesActions = AddSchedulesAction | FetchSchedulesAction | SetScheduleLoading;
