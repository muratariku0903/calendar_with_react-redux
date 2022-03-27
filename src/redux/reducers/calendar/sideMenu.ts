import { SideMenuState } from '../../stateTypes';
import { ActionTypes } from '../../actionTypes';
import { SideMenuActions } from '../../actions/calendar/sideMenu';


const initialState :SideMenuState= {
    isOpen: false
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
