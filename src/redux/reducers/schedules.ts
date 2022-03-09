import { Schedule, SchedulesState } from "../stateTypes";
import { SchedulesActions } from "../actions/schedules";
import { ActionTypes } from "../actionTypes";
import { createSchedulesKey, getScheduleById } from "../../services/schedules";

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

        case ActionTypes.ADD_SCHEDULES:
            let newSchedules: Schedule[];
            let prevSchedules = state.dateSchedules[action.payload.key];
            if (prevSchedules) {
                newSchedules = prevSchedules.concat(action.payload.schedule);
            } else {
                newSchedules = [action.payload.schedule];
            }
            return {
                ...state,
                dateSchedules: {
                    ...state.dateSchedules,
                    [action.payload.key]: newSchedules,
                },
            }

        // これ、更新した予定の日付が変わったらどうなる？keyで特定できない気がするけど、
        case ActionTypes.UPDATE_SCHEDULE: {
            const { id, key, schedule } = action.payload;
            // const prevSchedule = getScheduleById(state.dateSchedules, id);
            // const prevDate = prevSchedule?.date;
            // if (!prevDate) return state;
            // if (prevDate.toJSON() === schedule.date?.toJSON()) {
                return {
                    ...state,
                    dateSchedules: {
                        ...state.dateSchedules,
                        [key]: state.dateSchedules[key].map(prevSchedule => schedule.id === id ? schedule : prevSchedule),
                    }
                }
            // } else {
            //     const prevKey = createSchedulesKey(prevDate);
            //     const monthSchedules = {
            //         ...state.dateSchedules,
            //         [prevKey]: state.dateSchedules[prevKey].filter(schedule => schedule.id != id),
            //     };
            //     let newSchedules: Schedule[];
            //     let prevSchedules = monthSchedules[key];
            //     if (prevSchedules) {
            //         newSchedules = prevSchedules.concat(schedule);
            //     } else {
            //         newSchedules = [schedule];
            //     }
            //     return {
            //         ...state,
            //         dateSchedules: {
            //             ...state.dateSchedules,
            //             [key]: newSchedules,
            //         },
            //     }
            // }
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
                isLoading: true,
            }

        default:
            return state;
    }
}

export default schedules;
