import { Dayjs } from "dayjs"
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// カレンダーのstate
export type CalendarState = {
    year: number;
    month: number;
}

// 予定の型
export type ScheduleDate = Dayjs | MaterialUiPickersDate;
export type Schedule = {
    id: number;
    title: string;
    // 根本的にdateをオブジェクトで持っておくことが自体が間違いな気がする。タイムスタンプで良い気がする。そうすれば、いろいろ型が統一化される
    // だが、フォームからの入力値であるMaterialUiPickersDateをどうタイムスタンプに加工するか
    date: ScheduleDate;
    location: string;
    description: string;
}

export type DialogSchedule = {
    title: string;
    date: Dayjs | MaterialUiPickersDate;
    location: string;
    description: string;
}


// 予定を追加するダイアログのstate
export type AddScheduleDialogState = {
    schedule: DialogSchedule;
    isOpenDialog: boolean;
};


// 予定を表示するダイアログのstate
export type ShowScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
}

export type UpdateScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
}

// stringはもう少し具体的な型にした方がキーとして何を持つのか分かりにくい 年_月_日
// フロント側で設定するscheduleとfirestoreから取得するデータ型は一致してないといけない。
// つまり、フロント側でidを生成して、それをfirestoreに保存して編集や削除はそのidを元に行う。
export type MonthSchedules = Record<string, Schedule[]>;

// 予定のstate
export type SchedulesState = {
    // monthSchedulesじゃないの？あるいはdateSchedulesOfCurrMonthとか
    dateSchedules: MonthSchedules;
    isLoading: boolean;
}

// アプリ全体の表示を切り替えられるstateがあれば便利だね。
//  stateは最小限にしたいk

// 全体のstate
export type State = {
    calendar: CalendarState;
    addScheduleDialog: AddScheduleDialogState;
    schedules: SchedulesState;
    showScheduleDialog: ShowScheduleDialogState;
    updateScheduleDialog: UpdateScheduleDialogState;
}
