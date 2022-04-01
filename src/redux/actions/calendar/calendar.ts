import { ActionTypes } from "../../actionTypes";
import { CalendarState } from '../../stateTypes';

type SetMonthAction = {
    type: ActionTypes.SET_MONTH;
    payload: {
        year: CalendarState['year'];
        month: CalendarState['month'];
    };
}

export const setMonth = (year: CalendarState['year'], month: CalendarState['month']): SetMonthAction => {
    return {
        type: ActionTypes.SET_MONTH,
        payload: { year, month }
    }
}

type SetTypeAction = {
    type: ActionTypes.SET_TYPE;
    payload: CalendarState['type'];
}

export const setType = (type: CalendarState['type']): SetTypeAction => {
    return {
        type: ActionTypes.SET_TYPE,
        payload: type,
    };
};

export type CalendarActions = SetMonthAction | SetTypeAction;
