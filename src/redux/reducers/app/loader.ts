import { LoaderState } from "../../stateTypes";
import { ActionTypes } from "../../actionTypes";
import { LoaderActions } from '../../actions/app/loader';



const initialState: LoaderState = {
    isShow: false
}

const loader = (state = initialState, action: LoaderActions): LoaderState => {
    switch (action.type) {
        case ActionTypes.SHOW_LOADER:
            return { ...state, isShow: true };

        case ActionTypes.HIDE_LOADER:
            return { ...state, isShow: false };

        default:
            return state;
    }
}

export default loader;
