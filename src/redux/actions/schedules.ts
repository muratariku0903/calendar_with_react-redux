import { ActionTypes } from '../actionTypes';
import { SchedulesState, Schedule, DialogSchedule, SchedulesKey } from '../stateTypes';

type AddSchedulesAction = {
    type: ActionTypes.ADD_SCHEDULES;
    payload: {
        schedule: Schedule,
        key: SchedulesKey,
    };
}

export const addSchedules = (key: SchedulesKey, schedule: DialogSchedule, id: number): AddSchedulesAction => {
    return {
        type: ActionTypes.ADD_SCHEDULES,
        payload: { schedule: { ...schedule, id }, key }
    }
}

type UpdateScheduleAction = {
    type: ActionTypes.UPDATE_SCHEDULE;
    payload: {
        id: number;
        key: SchedulesKey;
        schedule: Schedule;
    }
}

export const updateSchedule = (id: number, key: SchedulesKey, schedule: Schedule): UpdateScheduleAction => {
    return {
        type: ActionTypes.UPDATE_SCHEDULE,
        payload: { id, key, schedule },
    }
}


type DeleteScheduleAction = {
    type: ActionTypes.DELETE_SCHEDULE;
    payload: {
        id: number;
        key: SchedulesKey;
    }
}

export const deleteSchedule = (key: SchedulesKey, id: number): DeleteScheduleAction => {
    return {
        type: ActionTypes.DELETE_SCHEDULE,
        payload: { id, key },
    }
}

type FetchSchedulesAction = {
    type: ActionTypes.FETCH_SCHEDULES;
    payload: Record<SchedulesKey, Schedule[]>;
}

export const setSchedules = (schedules: SchedulesState['monthSchedules']): FetchSchedulesAction => {
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

export type SchedulesActions = AddSchedulesAction | DeleteScheduleAction | UpdateScheduleAction | FetchSchedulesAction | SetScheduleLoading;
