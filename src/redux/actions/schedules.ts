import { ActionTypes } from '../actionTypes';
import { Schedule } from '../stateTypes';

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

export type SchedulesActions = AddSchedulesAction;
