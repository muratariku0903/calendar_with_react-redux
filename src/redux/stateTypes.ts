import dayjs from "dayjs"

// カレンダーのstate
export type CalendarState = {
    year: number;
    month: number;
};

// 予定の型
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
    isOpenDialog: boolean;
};


export type ShowScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
};

export type UpdateScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
};

// stringはもう少し具体的な型にした方がキーとして何を持つのか分かりにくい 年_月_日
export type SchedulesKey = `${number}_${number}_${number}` | string;

// 予定のstate
export type SchedulesState = {
    monthSchedules: Record<SchedulesKey, Schedule[]>;
    isLoading: boolean;
};


export type Holiday = {
    date: number;
    name: string;
};

export type HolidaysState = {
    holidays: Record<string, Holiday | null>;
    isLoading: boolean;
}

// 全体のstate
export type State = {
    calendar: CalendarState;
    schedules: SchedulesState;
    holidays: HolidaysState;
    addScheduleDialog: AddScheduleDialogState;
    showScheduleDialog: ShowScheduleDialogState;
    updateScheduleDialog: UpdateScheduleDialogState;
};
