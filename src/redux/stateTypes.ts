import dayjs from "dayjs"


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
    time: { start: number | null, end: number | null };
    location: string;
    description: string;
};
export type SchedulesState = {
    monthSchedules: Record<SchedulesKey, Schedule[]>;
    isLoading: boolean;
};

// AddDialogScheduleの方がわかりやすい
export type DialogSchedule = Omit<Schedule, 'id'>;
export const initialDialogForm: DialogSchedule = {
    title: '',
    date: dayjs().unix(),
    time: { start: null, end: null },
    location: '',
    description: '',
};


export type AddScheduleDialogState = {
    schedule: DialogSchedule;
    isStartEdit: boolean;
    isOpenDialog: boolean;
    isShowAlert: boolean;
};


export type ShowScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
};


export type UpdateScheduleDialogState = {
    schedule: Schedule;
    isStartEdit: boolean;
    isOpenDialog: boolean;
    isShowAlert: boolean;
};


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
    user: User;
    isOpenDialog: boolean;
    isStartEdit: boolean;
    isShowAlert: boolean;
};


export type SignupDialogState = {
    dialog: User;
    isShowAlert: boolean;
}


export type LoginDialogState = {
    dialog: Omit<User, 'name'>;
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
    user: UserState;
    updateUserDialog: UpdateUserDialogState;
    signupDialog: SignupDialogState;
    loginDialog: LoginDialogState;
    snackBar: SnackBarState;
};
