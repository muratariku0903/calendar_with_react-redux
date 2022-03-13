import { Schedule, SchedulesState } from "../stateTypes";
import { SchedulesActions } from "../actions/schedules";
import { ActionTypes } from "../actionTypes";
import { addScheduleToDateSchedules, updateDateSchedules } from "../../services/schedules";

const initialState: SchedulesState = {
    dateSchedules: {},
    isLoading: false
}

const schedules = (state = initialState, action: SchedulesActions): SchedulesState => {
    switch (action.type) {
        case ActionTypes.FETCH_SCHEDULES:
            return {
                ...state,
                dateSchedules: action.payload,
                isLoading: false,
            }

        case ActionTypes.ADD_SCHEDULES: {
            const { key, schedule } = action.payload;
            return {
                ...state,
                dateSchedules: {
                    ...state.dateSchedules,
                    [key]: addScheduleToDateSchedules(state.dateSchedules[key], schedule),
                },
            }
        }

        case ActionTypes.UPDATE_SCHEDULE: {
            const { key, schedule } = action.payload;
            return {
                ...state,
                dateSchedules: {
                    ...state.dateSchedules,
                    [key]: updateDateSchedules([...state.dateSchedules[key]], schedule),
                }
            }
        }

        case ActionTypes.DELETE_SCHEDULE:
            const { id, key } = action.payload;
            return {
                ...state,
                dateSchedules: {
                    ...state.dateSchedules,
                    [key]: state.dateSchedules[key].filter(schedule => schedule.id != id),
                },
                isLoading: false,
            }

        case ActionTypes.SET_SCHEDULES_LOADING:
            return {
                ...state,
                // これpayloadで受け取った方がいい気がsる
                isLoading: true,
            }

        default:
            return state;
    }
}

export default schedules;
