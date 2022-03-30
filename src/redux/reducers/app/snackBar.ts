import { SnackBarState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { SnackBarActions } from "../../actions/app/snackBar";


const initialState: SnackBarState = {
    isOpenSnackBar: false,
    type: null,
    message: '',
};

const snackBar = (state = initialState, action: SnackBarActions): SnackBarState => {
    switch (action.type) {
        case ActionTypes.SET_SNACKBAR:
            const { type, message } = action.payload;
            return { isOpenSnackBar: true, type, message };
        
        case ActionTypes.CLOSE_SNACKBAR:
            return initialState;

        default:
            return state;
    }
};

export default snackBar;
