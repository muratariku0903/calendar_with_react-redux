import { useDispatch, useSelector } from "react-redux";
import { State } from "../redux/stateTypes";
import { openSideMenu as open, closeSideMenu as close } from "../redux/actions/calendar/sideMenu";


export const useSideMenu = () => {
    const dispatch = useDispatch();
    const isSideMenuOpen = useSelector((state: State) => state.sideMenu.isOpen);
    const openSideMenu = () => dispatch(open());
    const closeSideMenu = () => dispatch(close());

    return { isSideMenuOpen, openSideMenu, closeSideMenu };
}
