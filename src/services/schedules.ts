import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const createSchedulesKey = (dateObj: MaterialUiPickersDate): string => {
    return String(dateObj?.year()) + '-' + String(dateObj?.month()) + '-' + String(dateObj?.date());
}
