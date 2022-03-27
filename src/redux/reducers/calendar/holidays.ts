import { HolidaysState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { HolidaysActions } from "../../actions/calendar/holidays";


const initialState: HolidaysState = {
    holidays: {},
    isLoading: false,
    error: null,
}

const holidays = (state = initialState, action: HolidaysActions): HolidaysState => {
    switch (action.type) {
        case ActionTypes.SET_HOLIDAYS:
            return {
                ...state,
                holidays: action.payload,
                isLoading: false,
            }

        case ActionTypes.SET_HOLIDAYS_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case ActionTypes.SET_HOLIDAYS_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}

export default holidays;
