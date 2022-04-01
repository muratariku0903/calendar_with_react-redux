import { CalendarState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { CalendarActions } from "../../actions/calendar/calendar";
import dayjs from 'dayjs';

const currentTime = dayjs();

const initialState: CalendarState = {
    year: currentTime.year(),
    month: currentTime.month() + 1,
    type: 'month',
}

const calendar = (state = initialState, action: CalendarActions): CalendarState => {
    switch (action.type) {
        case ActionTypes.SET_MONTH:
            const { year, month } = action.payload;
            return { ...state, year, month };

        case ActionTypes.SET_TYPE:
            return { ...state, type: action.payload };

        default:
            return state;
    }
}

export default calendar;
