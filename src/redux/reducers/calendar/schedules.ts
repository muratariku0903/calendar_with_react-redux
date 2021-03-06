import { SchedulesState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { SchedulesActions } from "../../actions/calendar/schedules";
import { addScheduleToDateSchedules, updateDateSchedules } from "../../../services/schedules";

const initialState: SchedulesState = {
    monthSchedules: {},
    isLoading: false,
}

const schedules = (state = initialState, action: SchedulesActions): SchedulesState => {
    switch (action.type) {
        case ActionTypes.SET_SCHEDULES:
            return {
                ...state,
                monthSchedules: action.payload,
                isLoading: false,
            }

        case ActionTypes.ADD_SCHEDULES: {
            const { key, schedule } = action.payload;
            return {
                ...state,
                monthSchedules: {
                    ...state.monthSchedules,
                    [key]: addScheduleToDateSchedules(key, state.monthSchedules, schedule),
                },
                isLoading: false,
            }
        }

        case ActionTypes.UPDATE_SCHEDULE: {
            const { key, schedule } = action.payload;
            return {
                ...state,
                monthSchedules: {
                    ...state.monthSchedules,
                    [key]: updateDateSchedules(state.monthSchedules[key], schedule),
                },
                isLoading: false,
            }
        }

        case ActionTypes.DELETE_SCHEDULE:
            const { id, key } = action.payload;
            return {
                ...state,
                monthSchedules: {
                    ...state.monthSchedules,
                    [key]: state.monthSchedules[key].filter(schedule => schedule.id != id),
                },
                isLoading: false,
            }

        case ActionTypes.SET_SCHEDULES_LOADING:
            return { ...state, isLoading: action.payload }

        default:
            return state;
    }
}

export default schedules;
