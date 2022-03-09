import { ActionTypes } from '../actionTypes';
import { MonthSchedules, Schedule, DialogSchedule } from '../stateTypes';

type AddSchedulesAction = {
    type: ActionTypes.ADD_SCHEDULES;
    payload: {
        schedule: Schedule,
        key: string,
    };
}

export const addSchedules = (key: string, schedule: DialogSchedule, id: number): AddSchedulesAction => {
    return {
        type: ActionTypes.ADD_SCHEDULES,
        payload: {
            schedule: { ...schedule, id: id },
            key: key,
        },
    }
}


type UpdateScheduleAction = {
    type: ActionTypes.UPDATE_SCHEDULE;
    payload: {
        id: number;
        key: string;
        schedule: Schedule;
    }
}

export const updateSchedule = (id: number, key: string, schedule: Schedule): UpdateScheduleAction => {
    return {
        type: ActionTypes.UPDATE_SCHEDULE,
        payload: { id, key, schedule },
    }
}


type DeleteScheduleAction = {
    type: ActionTypes.DELETE_SCHEDULE;
    payload: {
        id: number;
        key: string;
    }
}

export const deleteSchedule = (key: string, id: number): DeleteScheduleAction => {
    return {
        type: ActionTypes.DELETE_SCHEDULE,
        payload: { id, key },
    }
}

type FetchSchedulesAction = {
    type: ActionTypes.FETCH_SCHEDULES;
    payload: Record<string, Schedule[]>;
}

// fetchというよりsetの方がしっくりくるかも
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

export type SchedulesActions = AddSchedulesAction | DeleteScheduleAction | UpdateScheduleAction | FetchSchedulesAction | SetScheduleLoading;
