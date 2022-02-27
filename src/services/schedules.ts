import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// これ返り値さ独自の型を定義できないかな。キーがどういうフォーマットなのかを明示的にしたい。
export const createSchedulesKey = (dateObj: MaterialUiPickersDate): string => {
    return String(dateObj?.year()) + '_' + String(Number(dateObj?.month()) + 1) + '_' + String(dateObj?.date());
}
