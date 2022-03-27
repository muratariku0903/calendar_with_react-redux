import { combineReducers } from "redux";
import calendar from "./calendar/calendar";
import sideMenu from './calendar/sideMenu';
import addScheduleDialog from './calendar/addScheduleDialog';
import schedules from "./calendar/schedules";
import showScheduleDialog from "./calendar/showScheduleDialog";
import updateScheduleDialog from "./calendar/updateScheduleDialog";
import holidays from "./calendar/holidays";
import user from './auth/user';
import signupDialog from './auth/signupDialog';
import loginDialog from './auth/loginDialog';


export default combineReducers({
    calendar,
    sideMenu,
    schedules,
    addScheduleDialog,
    showScheduleDialog,
    updateScheduleDialog,
    holidays,
    user,
    signupDialog,
    loginDialog,
});
