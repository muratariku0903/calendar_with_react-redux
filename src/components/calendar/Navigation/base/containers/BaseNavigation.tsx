import BaseNavigation, { StateProps, DispatchProps } from "../BaseNavigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State, CalendarState } from "../../../../../redux/stateTypes";
import { setType } from '../../../../../redux/actions/calendar/calendar';
import { SchedulesActions } from "../../../../../redux/actions/calendar/schedules";
import { HolidaysActions } from '../../../../../redux/actions/calendar/holidays';
import { asyncLogout } from '../../../../../redux/actions/effects/user';
import { openSideMenu } from "../../../../../redux/actions/calendar/sideMenu";

const mapStateToProps = (store: State): StateProps => {
    return {
        boardType: store.calendar.type,
        isSideMenuOpen: store.sideMenu.isOpen,
        user: store.user,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions & HolidaysActions>): DispatchProps => {
    return {
        sideMenuOpen: () => dispatch(openSideMenu()),
        logout: () => dispatch(asyncLogout()),
        setBoardType: (type: CalendarState['type']) => dispatch(setType(type)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseNavigation);
