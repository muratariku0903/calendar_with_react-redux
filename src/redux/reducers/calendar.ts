import { ActionTypes } from "../actionTypes";
import { CalendarActions } from "../actions";
import { CalendarState } from "../types";

const currentTime = new Date();

const initialState: CalendarState = {
    year: currentTime.getFullYear(),
    month: currentTime.getMonth(),
    currentDay: currentTime.getDate(),
}

const calendar = (state = initialState, action: CalendarActions) => {
    switch (action.type) {
        case ActionTypes.PREV_CALENDAR: {
            let newYear = state.year;
            let newMonth = state.month;
            if (state.month === 0) {
                newYear--;
                newMonth = 11;
            } else {
                newMonth--;
            }
            return {
                ...state,
                year: newYear,
                month: newMonth,
            }
        }

        case ActionTypes.NEXT_CALENDAR: {
            let newYear = state.year;
            let newMonth = state.month;
            if (state.month === 11) {
                newYear++;
                newMonth = 0;
            } else {
                newMonth++;
            }
            return {
                ...state,
                year: newYear,
                month: newMonth,
            }
        }

        case ActionTypes.SET_MONTH: {
            const month = action.payload.month;
            return {
                ...state,
                month: month,
            }
        }

        default:
            return state;
    }
}

export default calendar;
