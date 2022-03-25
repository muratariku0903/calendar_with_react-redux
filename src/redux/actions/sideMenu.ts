import { ActionTypes } from '../actionTypes';

type OpenSideMenuAction = {
    type: ActionTypes.OPEN_SIDE_MENU;
}

export const openSideMenu = ():OpenSideMenuAction => {
    return { type: ActionTypes.OPEN_SIDE_MENU };
}


type CloseSideMenuAction = {
    type: ActionTypes.CLOSE_SIDE_MENU;
}

export const closeSideMenu = ():CloseSideMenuAction => {
    return { type: ActionTypes.CLOSE_SIDE_MENU };
}

export type SideMenuActions = OpenSideMenuAction | CloseSideMenuAction;
