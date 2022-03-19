// オブジェクトにして階層化すれば？
export enum ActionTypes {
    //calendar
    SET_MONTH = 'SET_MONTH',
    //add dialog
    SET_ADD_SCHEDULE_DIALOG = "SET_ADD_SCHEDULE_DIALOG",
    START_EDIT_ADD_SCHEDULE_DIALOG = "START_EDIT_ADD_SCHEDULE_DIALOG",
    OPEN_ADD_SCHEDULE_DIALOG = "OPEN_ADD_SCHEDULE_DIALOG",
    CLOSE_ADD_SCHEDULE_DIALOG = "CLOSE_ADD_SCHEDULE_DIALOG",
    //show dialog
    SET_SHOW_SCHEDULE_DIALOG = "SET_SHOW_SCHEDULE_DIALOG",
    OPEN_SHOW_SCHEDULE_DIALOG = "OPEN_SHOW_SCHEDULE_DIALOG",
    CLOSE_SHOW_SCHEDULE_DIALOG = "CLOSE_SHOW_SCHEDULE_DIALOG",
    //update dialog
    SET_UPDATE_SCHEDULE_DIALOG = "SET_UPDATE_SCHEDULE_DIALOG",
    START_EDIT_UPDATE_SCHEDULE_DIALOG = "START_EDIT_UPDATE_SCHEDULE_DIALOG",
    OPEN_UPDATE_SCHEDULE_DIALOG = "OPEN_UPDATE_SCHEDULE_DIALOG",
    CLOSE_UPDATE_SCHEDULE_DIALOG = "CLOSE_UPDATE_SCHEDULE_DIALOG",
    //schedules
    FETCH_SCHEDULES = "FETCH_SCHEDULES",
    ADD_SCHEDULES = "ADD_SCHEDULES",
    UPDATE_SCHEDULE = "UPDATE_SCHEDULE",
    DELETE_SCHEDULE = "DELETE_SCHEDULE",
    SET_SCHEDULES_LOADING = "SET_SCHEDULES_LOADING",
    //holidays
    SET_HOLIDAYS = "SET_HOLIDAYS",
    SET_HOLIDAYS_LOADING = "SET_HOLIDAYS_LOADING",
}
