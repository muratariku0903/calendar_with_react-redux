import { CalendarState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { CalendarActions } from "../../actions/calendar/calendar";
import dayjs from 'dayjs';

const currentTime = dayjs();

const initialState: CalendarState = {
    year: currentTime.year(),
    month: currentTime.month() + 1,
}

const calendar = (state = initialState, action: CalendarActions): CalendarState => {
    switch (action.type) {
        case ActionTypes.SET_MONTH:
            return action.payload;

        default:
            return state;
    }
}

export default calendar;
