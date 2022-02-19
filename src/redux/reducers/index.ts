import { combineReducers } from "redux";
import calendar from "./calendar";
import addScheduleDialog from './addScheduleDialog';

export default combineReducers({ calendar, addScheduleDialog });
