import { CalendarState } from "../stateTypes";
import { ActionTypes } from "../actionTypes";
import { CalendarActions } from "../actions/calendar";
import dayjs from 'dayjs';

const currentTime = dayjs();

const initialState: CalendarState = {
    year: currentTime.year(),
    month: currentTime.month(),
}

const calendar = (state = initialState, action: CalendarActions) => {
    switch (action.type) {
        case ActionTypes.SET_MONTH: {
            const { year, month } = action.payload;
            // これpayloadを返却すれば良い気がするけど。
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
