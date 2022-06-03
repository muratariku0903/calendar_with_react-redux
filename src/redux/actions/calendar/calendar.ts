import { ActionTypes } from "../../actionTypes";
import { CalendarState } from '../../stateTypes';

type SetMonthAction = {
    type: ActionTypes.SET_MONTH;
    payload: {
        year: CalendarState['year'];
        month: CalendarState['month'];
        firstDateOfWeekTimeStamp: CalendarState['firstDateOfWeekTimeStamp'];
    };
}

export const setMonth = (year: CalendarState['year'], month: CalendarState['month'], firstDateOfWeekTimeStamp: CalendarState['firstDateOfWeekTimeStamp']): SetMonthAction => {
    return {
        type: ActionTypes.SET_MONTH,
        payload: { year, month, firstDateOfWeekTimeStamp }
    }
}

type SetWeekAction = {
    type: ActionTypes.SET_WEEK;
    payload: {
        year: CalendarState['year'];
        month: CalendarState['month'];
        firstDateOfWeekTimeStamp: CalendarState['firstDateOfWeekTimeStamp'];
    };
}

export const setWeek = (year: CalendarState['year'], month: CalendarState['month'], firstDateOfWeekTimeStamp: CalendarState['firstDateOfWeekTimeStamp']): SetWeekAction => {
    return {
        type: ActionTypes.SET_WEEK,
        payload: { year, month, firstDateOfWeekTimeStamp }
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
