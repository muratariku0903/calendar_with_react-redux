import { ActionTypes } from "../../actionTypes";

type SetMonthAction = {
    type: ActionTypes.SET_MONTH;
    payload: {
        year: number;
        month: number;
    };
}

export const setMonth = (year: number, month: number): SetMonthAction => {
    return {
        type: ActionTypes.SET_MONTH,
        payload: { year, month }
    }
}

export type CalendarActions = SetMonthAction;
