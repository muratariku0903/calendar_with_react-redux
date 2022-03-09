import { UpdateScheduleDialogState } from '../stateTypes';
import { UpdateScheduleDialogActions } from '../actions/updateScheduleDialog';
import { ActionTypes } from '../actionTypes';

const initialState: UpdateScheduleDialogState = {
    schedule: {
        id: -1,
        title: '',
        date: null,
        location: '',
        description: '',
    },
    isOpenDialog: false,
}


export const updateScheduleDialog = (state = initialState, action: UpdateScheduleDialogActions): UpdateScheduleDialogState => {
    switch (action.type) {
        case ActionTypes.SET_UPDATE_SCHEDULE_DIALOG:
            return {
                ...state,
                schedule: action.payload,
            }

        case ActionTypes.OPEN_UPDATE_SCHEDULE_DIALOG:
            return {
                ...state,
                isOpenDialog: true,
            }

        case ActionTypes.CLOSE_UPDATE_SCHEDULE_DIALOG:
            return initialState;

        default:
            return state;
    }
}
