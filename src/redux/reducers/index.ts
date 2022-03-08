import { combineReducers } from "redux";
import calendar from "./calendar";
import addScheduleDialog from './addScheduleDialog';
import schedules from "./schedules";
import showScheduleDialog from "./showScheduleDialog";
import { updateScheduleDialog } from "./updateScheduleDialog";

export default combineReducers({
    calendar,
    addScheduleDialog,
    schedules,
    showScheduleDialog,
    updateScheduleDialog,
});
