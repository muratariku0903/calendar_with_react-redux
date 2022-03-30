import { HolidaysState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { HolidaysActions } from "../../actions/calendar/holidays";


const initialState: HolidaysState = {
    holidays: {},
    isLoading: false,
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
            return { ...state, isLoading: action.payload }

        default:
            return state;
    }
}

export default holidays;
