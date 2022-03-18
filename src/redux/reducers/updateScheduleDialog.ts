import { UpdateScheduleDialogState, initialDialogForm } from '../stateTypes';
import { ActionTypes } from '../actionTypes';
import { UpdateScheduleDialogActions } from '../actions/updateScheduleDialog';

const initialState: UpdateScheduleDialogState = {
    schedule: { id: -1, ...initialDialogForm },
    isOpenDialog: false,
}


const updateScheduleDialog = (state = initialState, action: UpdateScheduleDialogActions): UpdateScheduleDialogState => {
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

export default updateScheduleDialog;
