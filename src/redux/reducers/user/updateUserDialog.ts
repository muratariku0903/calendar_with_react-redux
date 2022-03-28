import { UpdateUserDialogState } from '../../stateTypes';
import { UpdateUserDialogActions } from '../../actions/user/updateUserDialog';
import { ActionTypes } from '../../actionTypes';


const initialState: UpdateUserDialogState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    isOpenDialog: false,
    isShowAlert: false,
}


const updateUserDialog = (state = initialState, action: UpdateUserDialogActions): UpdateUserDialogState => {
    switch (action.type) {
        case ActionTypes.SET_UPDATE_USER_DIALOG:
            return { ...state, user: action.payload };

        case ActionTypes.OPEN_UPDATE_USER_DIALOG:
            return { ...state, isOpenDialog: true };

        case ActionTypes.CLOSE_UPDATE_USER_DIALOG:
            return initialState;

        default:
            return state;
    }
}

export default updateUserDialog;

