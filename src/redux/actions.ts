import { ActionTypes } from "./actionTypes";

type PrevCalendarAction = {
    type: ActionTypes.PREV_CALENDAR;
}

export const prevCalendar = (): PrevCalendarAction => {
    return { type: ActionTypes.PREV_CALENDAR };
}

type NextCalendarAction = {
    type: ActionTypes.NEXT_CALENDAR;
}

export const nextCalendar = (): NextCalendarAction => {
    return { type: ActionTypes.NEXT_CALENDAR };
}

type SetMonthAction = {
    type: ActionTypes.SET_MONTH;
    payload: {
        month: number
    };
}

export const setMonth = (month: number): SetMonthAction => {
    return {
        type: ActionTypes.SET_MONTH,
        payload: { month }
    }
}

export type CalendarActions = PrevCalendarAction | NextCalendarAction | SetMonthAction;
