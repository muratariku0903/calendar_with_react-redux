import { UpdateScheduleDialogState, initialDialogForm } from '../../stateTypes';
import { ActionTypes } from '../../actionTypes';
import { UpdateScheduleDialogActions } from '../../actions/calendar/updateScheduleDialog';

const initialState: UpdateScheduleDialogState = {
    schedule: { id: -1, ...initialDialogForm },
    isStartEdit: false,
    isOpenDialog: false,
    isShowAlert: false,
}

const updateScheduleDialog = (state = initialState, action: UpdateScheduleDialogActions): UpdateScheduleDialogState => {
    switch (action.type) {
        case ActionTypes.SET_UPDATE_SCHEDULE_DIALOG:
            return { ...state, schedule: action.payload };
        
        case ActionTypes.START_EDIT_UPDATE_SCHEDULE_DIALOG:
            return { ...state, isStartEdit: true };
        
        case ActionTypes.OPEN_UPDATE_SCHEDULE_DIALOG:
            return { ...state, isOpenDialog: true, };
        
        case ActionTypes.CLOSE_UPDATE_SCHEDULE_DIALOG:
            return initialState;
        
        case ActionTypes.SHOW_UPDATE_SCHEDULE_DIALOG_ALERT:
            return { ...state, isShowAlert: action.payload };
        
        default:
            return state;
    }
}

export default updateScheduleDialog;
