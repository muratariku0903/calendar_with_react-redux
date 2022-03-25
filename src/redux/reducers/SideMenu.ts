import { SideMenuState } from '../stateTypes';
import { SideMenuActions } from '../actions/sideMenu';
import { ActionTypes } from '../actionTypes';


const initialState :SideMenuState= {
    isOpen: true
}

const sideMenu = (state = initialState, action: SideMenuActions) => {
    switch (action.type) {
        case ActionTypes.OPEN_SIDE_MENU:
            return { isOpen: true };
        
        case ActionTypes.CLOSE_SIDE_MENU:
            return { isOpen: false };
        
        default:
            return state;
    }
}

export default sideMenu;
