import { Dayjs } from "dayjs"
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// カレンダーのstate
export type CalendarState = {
    year: number;
    month: number;
};

// 予定の型
export type ScheduleDate = Dayjs | MaterialUiPickersDate;
export type ScheduleTime = { start: number | null, end: number | null };
export type Schedule = {
    id: number;
    title: string;
    // 根本的にdateをオブジェクトで持っておくことが自体が間違いな気がする。タイムスタンプで良い気がする。そうすれば、いろいろ型が統一化される
    // だが、フォームからの入力値であるMaterialUiPickersDateをどうタイムスタンプに加工するか
    date: ScheduleDate;
    time: ScheduleTime;
    location: string;
    description: string;
};

export type DialogSchedule = {
    title: string;
    date: ScheduleDate;
    time: ScheduleTime;
    location: string;
    description: string;
};
export const initialDialogForm: DialogSchedule = {
    title: '',
    date: null,
    time: { start: null, end: null },
    location: '',
    description: '',
};


// 予定を追加するダイアログのstate
export type AddScheduleDialogState = {
    schedule: DialogSchedule;
    isOpenDialog: boolean;
};


// 予定を表示するダイアログのstate
export type ShowScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
};

export type UpdateScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
};

// stringはもう少し具体的な型にした方がキーとして何を持つのか分かりにくい 年_月_日
// フロント側で設定するscheduleとfirestoreから取得するデータ型は一致してないといけない。
// つまり、フロント側でidを生成して、それをfirestoreに保存して編集や削除はそのidを元に行う。
export type MonthSchedules = Record<string, Schedule[]>;

// 予定のstate
export type SchedulesState = {
    // monthSchedulesじゃないの？あるいはdateSchedulesOfCurrMonthとか
    dateSchedules: MonthSchedules;
    isLoading: boolean;
};

export type Holiday = {
    date: ScheduleDate;
    name: string;
} | null;

export type Holidays = Record<string, Holiday>;

export type HolidaysState = {
    holidays: Holidays;
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
