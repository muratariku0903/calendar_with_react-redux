import dayjs from "dayjs"
import { roundMinutes } from "../services/calendar";


export type CalendarState = {
    year: number;
    month: number;
    firstDateOfWeek: number;
    type: 'month' | 'week';
};


export type SchedulesKey = `${number}_${number}_${number}` | string;
export type Schedule = {
    id: number;
    title: string;
    date: number;
    time: { start: number, end: number };
    location: string;
    description: string;
};
export type SchedulesState = {
    monthSchedules: Record<SchedulesKey, Schedule[]>;
    isLoading: boolean;
};


export type DialogSchedule = Omit<Schedule, 'id'>;
const currTime = roundMinutes(dayjs().unix());
export const initialDialogForm: DialogSchedule = {
    title: '',
    date: currTime,
    time: { start: currTime, end: dayjs.unix(currTime).add(1, 'h').unix() },
    location: '',
    description: '',
};

export type AddScheduleDialogState = {
    schedule: DialogSchedule;
    isOpenDialog: boolean;
    isStartEdit: boolean;
    isShowAlert: boolean;
};


export type ShowScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
};


export type UpdateScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
    isStartEdit: boolean;
    isShowAlert: boolean;
};

export type EmailScheduleDialogState = {
    form: { emailTo: string, emailTitle: string, emailMessage: string };
    schedule: Omit<Schedule, 'id'>;
    isOpenDialog: boolean;
    isStartEdit: boolean;
    isShowAlert: boolean;
    isLoading: boolean;
}


export type Holiday = {
    date: number;
    name: string;
};
export type HolidaysState = {
    holidays: Record<string, Holiday | null>;
    isLoading: boolean;
}


export type SideMenuState = {
    isOpen: boolean;
}


export type User = {
    id: string | null;
    email: string;
    password: string;
    name: string;
}
export type UserState = {
    user: User;
    isLogin: boolean;
    isLoading: boolean;
}

export type UpdateUserDialogState = {
    user: Omit<User, 'id'>;
    isOpenDialog: boolean;
    isStartEdit: boolean;
    isShowAlert: boolean;
};


export type SignupDialogState = {
    dialog: Omit<User, 'id'>;
    isShowAlert: boolean;
}


export type LoginDialogState = {
    dialog: Omit<User, 'name' | 'id'>;
    isShowAlert: boolean;
}

export type SnackBarState = {
    isOpenSnackBar: boolean;
    type: 'success' | 'error' | null;
    message: string;
}

export type State = {
    calendar: CalendarState;
    schedules: SchedulesState;
    holidays: HolidaysState;
    sideMenu: SideMenuState;
    addScheduleDialog: AddScheduleDialogState;
    showScheduleDialog: ShowScheduleDialogState;
    updateScheduleDialog: UpdateScheduleDialogState;
    emailScheduleDialog: EmailScheduleDialogState;
    user: UserState;
    updateUserDialog: UpdateUserDialogState;
    signupDialog: SignupDialogState;
    loginDialog: LoginDialogState;
    snackBar: SnackBarState;
};
