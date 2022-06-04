// オブジェクトにして階層化すれば？
export enum ActionTypes {
    //calendar
    SET_MONTH = 'SET_MONTH',
    SET_WEEK = 'SET_WEEK',
    SET_TYPE = 'SET_TYPE',
    //sideMenu
    OPEN_SIDE_MENU = 'OPEN_SIDE_MENU',
    CLOSE_SIDE_MENU = 'CLOSE_SIDE_MENU',
    //add dialog
    SET_ADD_SCHEDULE_DIALOG = "SET_ADD_SCHEDULE_DIALOG",
    START_EDIT_ADD_SCHEDULE_DIALOG = "START_EDIT_ADD_SCHEDULE_DIALOG",
    OPEN_ADD_SCHEDULE_DIALOG = "OPEN_ADD_SCHEDULE_DIALOG",
    CLOSE_ADD_SCHEDULE_DIALOG = "CLOSE_ADD_SCHEDULE_DIALOG",
    SHOW_ADD_SCHEDULE_DIALOG_ALERT = "SHOW_ADD_SCHEDULE_DIALOG_ALERT",
    //show dialog
    SET_SHOW_SCHEDULE_DIALOG = "SET_SHOW_SCHEDULE_DIALOG",
    OPEN_SHOW_SCHEDULE_DIALOG = "OPEN_SHOW_SCHEDULE_DIALOG",
    CLOSE_SHOW_SCHEDULE_DIALOG = "CLOSE_SHOW_SCHEDULE_DIALOG",
    //update dialog
    SET_UPDATE_SCHEDULE_DIALOG = "SET_UPDATE_SCHEDULE_DIALOG",
    START_EDIT_UPDATE_SCHEDULE_DIALOG = "START_EDIT_UPDATE_SCHEDULE_DIALOG",
    OPEN_UPDATE_SCHEDULE_DIALOG = "OPEN_UPDATE_SCHEDULE_DIALOG",
    CLOSE_UPDATE_SCHEDULE_DIALOG = "CLOSE_UPDATE_SCHEDULE_DIALOG",
    SHOW_UPDATE_SCHEDULE_DIALOG_ALERT = "SHOW_UPDATE_SCHEDULE_DIALOG_ALERT",
    // email dialog
    SET_EMAIL_SCHEDULE_DIALOG = "SET_EMAIL_SCHEDULE_DIALOG",
    SET_EMAIL_CONTENTS_TO_EMAIL_SCHEDULE_DIALOG = "SET_EMAIL_CONTENTS_TO_EMAIL_SCHEDULE_DIALOG",
    START_EDIT_EMAIL_SCHEDULE_DIALOG = "START_EDIT_EMAIL_SCHEDULE_DIALOG",
    OPEN_EMAIL_SCHEDULE_DIALOG = "OPEN_EMAIL_SCHEDULE_DIALOG",
    CLOSE_EMAIL_SCHEDULE_DIALOG = "CLOSE_EMAIL_SCHEDULE_DIALOG",
    SHOW_EMAIL_SCHEDULE_DIALOG_ALERT = "SHOW_EMAIL_SCHEDULE_DIALOG_ALERT",
    SET_EMAIL_SCHEDULE_DIALOG_LOADING = "SET_EMAIL_SCHEDULE_DIALOG_LOADING",
    //schedules
    SET_SCHEDULES = "SET_SCHEDULES",
    ADD_SCHEDULES = "ADD_SCHEDULES",
    UPDATE_SCHEDULE = "UPDATE_SCHEDULE",
    DELETE_SCHEDULE = "DELETE_SCHEDULE",
    SET_SCHEDULES_LOADING = "SET_SCHEDULES_LOADING",
    //holidays
    SET_HOLIDAYS = "SET_HOLIDAYS",
    SET_HOLIDAYS_LOADING = "SET_HOLIDAYS_LOADING",
    //user
    SET_USER = 'SET_USER',
    RESET_USER = 'RESET_USER',
    SET_USER_LOADING = "SET_USER_LOADING",
    //update user dialog
    SET_UPDATE_USER_DIALOG = "SET_UPDATE_USER_DIALOG",
    OPEN_UPDATE_USER_DIALOG = "OPEN_UPDATE_USER_DIALOG",
    CLOSE_UPDATE_USER_DIALOG = "CLOSE_UPDATE_USER_DIALOG",
    START_EDIT_UPDATE_USER_DIALOG = "START_EDIT_UPDATE_USER_DIALOG",
    SHOW_UPDATE_USER_DIALOG_ALERT = "SHOW_UPDATE_USER_DIALOG_ALERT",
    //signup
    SET_SIGNUP_DIALOG = "SET_SIGNUP_DIALOG",
    SHOW_SIGNUP_DIALOG_ALERT = "SHOW_SIGNUP_DIALOG_ALERT",
    //login
    SET_LOGIN_DIALOG = "SET_LOGIN_DIALOG",
    SHOW_LOGIN_DIALOG_ALERT = "SHOW_LOGIN_DIALOG_ALERT",
    //snackbar
    OPEN_SNACKBAR = "OPEN_SNACKBAR",
    CLOSE_SNACKBAR = "CLOSE_SNACKBAR",
    SET_SNACKBAR = "SET_SNACKBAR",
    //loader
    SHOW_LOADER = "SHOW_LOADER",
    HIDE_LOADER = "HIDE_LOADER",
}
