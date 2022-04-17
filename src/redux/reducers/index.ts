import { combineReducers } from "redux";
import calendar from "./calendar/calendar";
import sideMenu from './calendar/sideMenu';
import baseInputDialog from "./calendar/baseInputDialog";
import addScheduleDialog from './calendar/addScheduleDialog';
import schedules from "./calendar/schedules";
import showScheduleDialog from "./calendar/showScheduleDialog";
import updateScheduleDialog from "./calendar/updateScheduleDialog";
import holidays from "./calendar/holidays";
import user from './user/user';
import updateUserDialog from "./user/updateUserDialog";
import signupDialog from './auth/signupDialog';
import loginDialog from './auth/loginDialog';
import snackBar from "./app/snackBar";


export default combineReducers({
    calendar,
    sideMenu,
    schedules,
    baseInputDialog,
    addScheduleDialog,
    showScheduleDialog,
    updateScheduleDialog,
    holidays,
    user,
    updateUserDialog,
    signupDialog,
    loginDialog,
    snackBar,
});
