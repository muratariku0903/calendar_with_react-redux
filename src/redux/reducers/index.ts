import { combineReducers } from "redux";
import calendar from "./calendar";
import addScheduleDialog from './addScheduleDialog';
import schedules from "./schedules";

export default combineReducers({ calendar, addScheduleDialog, schedules });
