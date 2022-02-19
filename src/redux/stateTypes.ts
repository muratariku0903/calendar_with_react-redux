import { Dayjs } from "dayjs"
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// カレンダーのstate
export type CalendarState = {
    year: number;
    month: number;
}

// 予定を追加するダイアログのstate
export type AddScheduleDialogState = {
    form: {
        title: string,
        date: Dayjs | MaterialUiPickersDate,
        location: string,
        description: string,
    },
    isOpenDialog: boolean,
}


// アプリ全体の表示を切り替えられるstateがあれば便利だね。
//  stateは最小限にしたい

// 全体のstate
export type State = {
    calendar: CalendarState;
    addScheduleDialog: AddScheduleDialogState;
}
