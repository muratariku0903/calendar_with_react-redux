import dayjs from "dayjs"


export type CalendarState = {
    year: number;
    month: number;
};


export type Schedule = {
    id: number;
    title: string;
    date: number;
    time: { start: number | null, end: number | null };
    location: string;
    description: string;
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
};


// 予定のstate
export type SchedulesKey = `${number}_${number}_${number}` | string;
export type SchedulesState = {
    monthSchedules: Record<SchedulesKey, Schedule[]>;
    isLoading: boolean;
    error: null | string;
};


export type Holiday = {
    date: number;
    name: string;
};
export type HolidaysState = {
    holidays: Record<string, Holiday | null>;
    isLoading: boolean;
    error: null | string;
}


export type State = {
    calendar: CalendarState;
    schedules: SchedulesState;
    holidays: HolidaysState;
    addScheduleDialog: AddScheduleDialogState;
    showScheduleDialog: ShowScheduleDialogState;
    updateScheduleDialog: UpdateScheduleDialogState;
};
