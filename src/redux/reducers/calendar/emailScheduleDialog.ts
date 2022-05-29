import { EmailScheduleDialogState, initialDialogForm } from '../../stateTypes';
import { ActionTypes } from '../../actionTypes';
import { EmailScheduleDialogActions } from '../../actions/calendar/emailScheduleDialog';

const initialState: EmailScheduleDialogState = {
    form: { email: '', title: '', description: '', },
    isStartEdit: false,
    isOpenDialog: false,
    isShowAlert: false,
}

const emailScheduleDialog = (state = initialState, action: EmailScheduleDialogActions): EmailScheduleDialogState => {
    switch (action.type) {
        case ActionTypes.SET_EMAIL_SCHEDULE_DIALOG:
            return { ...state, form: action.payload };

        case ActionTypes.START_EDIT_EMAIL_SCHEDULE_DIALOG:
            return { ...state, isStartEdit: true };

        case ActionTypes.OPEN_EMAIL_SCHEDULE_DIALOG:
            return { ...state, isOpenDialog: true, };

        case ActionTypes.CLOSE_EMAIL_SCHEDULE_DIALOG:
            return initialState;

        case ActionTypes.SHOW_EMAIL_SCHEDULE_DIALOG_ALERT:
            return { ...state, isShowAlert: action.payload };

        default:
            return state;
    }
}

export default emailScheduleDialog;
