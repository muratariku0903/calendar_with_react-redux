import { CalendarState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { CalendarActions } from "../../actions/calendar/calendar";
import { localStorageApi } from "../../../api/LocalStorage/CalendarApi";
import dayjs from 'dayjs';
import { getFirstDateOfWeekTimeStamp, getFirstMonthOfWeek, getFirstYearOfWeek } from "../../../services/calendar";

const currStamp = dayjs().unix();

const initialState: CalendarState = {
    year: getFirstYearOfWeek(currStamp),
    month: getFirstMonthOfWeek(currStamp),
    firstDateOfWeekTimeStamp: getFirstDateOfWeekTimeStamp(currStamp),
    type: 'month',
}
localStorageApi.setCalendar(initialState.year, initialState.month, initialState.firstDateOfWeekTimeStamp);


const calendar = (state = initialState, action: CalendarActions): CalendarState => {
    switch (action.type) {
        case ActionTypes.SET_MONTH: {
            const { year, month, firstDateOfWeekTimeStamp } = action.payload;
            localStorageApi.setCalendar(year, month, firstDateOfWeekTimeStamp);
            return { ...state, year, month, firstDateOfWeekTimeStamp };
        }

        case ActionTypes.SET_WEEK: {
            const { year, month, firstDateOfWeekTimeStamp } = action.payload;
            localStorageApi.setCalendar(year, month, firstDateOfWeekTimeStamp);
            return { ...state, year, month, firstDateOfWeekTimeStamp };
        }

        case ActionTypes.SET_TYPE:
            return { ...state, type: action.payload };

        default:
            return state;
    }
}

export default calendar;
