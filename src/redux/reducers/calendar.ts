import { ActionTypes } from "../actionTypes";
import { CalendarActions } from "../actions";
import { CalendarState } from "../types";

const currentTime = new Date();

const initialState: CalendarState = {
    year: currentTime.getFullYear(),
    month: currentTime.getMonth(),
}

const calendar = (state = initialState, action: CalendarActions) => {
    switch (action.type) {
        case ActionTypes.SET_MONTH: {
            const { year, month } = action.payload;
            return {
                ...state,
                year: year,
                month: month,
            }
        }

        default:
            return state;
    }
}

export default calendar;
