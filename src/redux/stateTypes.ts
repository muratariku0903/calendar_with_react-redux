import { Dayjs } from "dayjs"
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// カレンダーのstate
export type CalendarState = {
    year: number;
    month: number;
}

// 予定の型
export type Schedule = {
    title: string;
    date: Dayjs | MaterialUiPickersDate;
    location: string;
    description: string;
}

// 予定を追加するダイアログのstate
export type AddScheduleDialogState = {
    form: Schedule;
    isOpenDialog: boolean;
}

// 予定のstate
export type SchedulesState = {
    dateSchedules: Record<string, Schedule[]>;
    isLoading: boolean;
}

// 予定を表示するダイアログのstate
export type ShowScheduleDialogState = {
    schedule: Schedule;
    isOpenDialog: boolean;
}


// アプリ全体の表示を切り替えられるstateがあれば便利だね。
//  stateは最小限にしたい

// 全体のstate
export type State = {
    calendar: CalendarState;
    addScheduleDialog: AddScheduleDialogState;
    schedules: SchedulesState;
    showScheduleDialog: ShowScheduleDialogState;
}
