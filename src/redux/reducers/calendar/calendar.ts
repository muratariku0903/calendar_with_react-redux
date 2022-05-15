import { CalendarState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { CalendarActions } from "../../actions/calendar/calendar";
import { localStorageApi } from "../../../api/LocalStorage/CalendarApi";
import dayjs from 'dayjs';

const currentTime = dayjs();

const initialState: CalendarState = {
    year: currentTime.year(),
    month: currentTime.month() + 1,
    firstDateOfWeek: currentTime.subtract(currentTime.day(), 'd').date(),
    type: 'month',
}
localStorageApi.setCalendar(initialState.year, initialState.month, initialState.firstDateOfWeek);


const calendar = (state = initialState, action: CalendarActions): CalendarState => {
    switch (action.type) {
        case ActionTypes.SET_MONTH: {
            const { year, month, firstDateOfWeek } = action.payload;
            localStorageApi.setCalendar(year, month, firstDateOfWeek);
            return { ...state, year, month, firstDateOfWeek };
        }

        case ActionTypes.SET_WEEK: {
            const { year, month, firstDateOfWeek } = action.payload;
            localStorageApi.setCalendar(year, month, firstDateOfWeek);
            return { ...state, year, month, firstDateOfWeek };
        }

        case ActionTypes.SET_TYPE:
            return { ...state, type: action.payload };

        default:
            return state;
    }
}

export default calendar;
