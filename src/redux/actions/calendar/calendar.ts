import { ActionTypes } from "../../actionTypes";
import { CalendarState } from '../../stateTypes';

type SetMonthAction = {
    type: ActionTypes.SET_MONTH;
    payload: {
        year: CalendarState['year'];
        month: CalendarState['month'];
        firstDateOfWeek: CalendarState['firstDateOfWeek'];
    };
}

export const setMonth = (year: CalendarState['year'], month: CalendarState['month'], firstDateOfWeek: CalendarState['firstDateOfWeek']): SetMonthAction => {
    return {
        type: ActionTypes.SET_MONTH,
        payload: { year, month, firstDateOfWeek }
    }
}

type SetWeekAction = {
    type: ActionTypes.SET_WEEK;
    payload: {
        year: CalendarState['year'];
        month: CalendarState['month'];
        firstDateOfWeek: CalendarState['firstDateOfWeek'];
    };
}

export const setWeek = (year: CalendarState['year'], month: CalendarState['month'], firstDateOfWeek: CalendarState['firstDateOfWeek']): SetWeekAction => {
    return {
        type: ActionTypes.SET_WEEK,
        payload: { year, month, firstDateOfWeek }
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

export type CalendarActions = SetMonthAction | SetWeekAction | SetTypeAction;
