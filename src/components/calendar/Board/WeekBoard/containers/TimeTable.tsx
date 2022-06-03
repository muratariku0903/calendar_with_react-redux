import TimeTable, { DispatchProps } from '../parts/TimeTable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State, Schedule, initialDialogForm } from '../../../../../redux/stateTypes';
import { SchedulesActions } from '../../../../../redux/actions/calendar/schedules';
import { openAddScheduleDialog, setAddScheduleDialog } from '../../../../../redux/actions/calendar/addScheduleDialog';
import { asyncUpdateScheduleWithTimeValidate } from '../../../../../redux/actions/effects/schedules';
import { localStorageApi } from '../../../../../api/LocalStorage/CalendarApi';
import dayjs from 'dayjs';


const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<State, undefined, SchedulesActions>): DispatchProps => {
    return {
        openAddDialog: (dayOfTheWeek: number, startHour: number, startMinute: number): void => {
            const { year, month, firstDateOfWeekTimeStamp } = localStorageApi.getCalendar();
            const date = dayjs(`${year}-${month}-${dayjs.unix(firstDateOfWeekTimeStamp).date() + dayOfTheWeek}`);
            const scheduleTimeStart = date.hour(startHour).minute(startMinute).unix();
            const scheduleTimeEnd = date.hour(startHour + 1).minute(startHour + 1 === 24 ? 0 : startMinute).unix();
            const time: Schedule['time'] = { start: scheduleTimeStart, end: scheduleTimeEnd };
            dispatch(setAddScheduleDialog({ ...initialDialogForm, date: date.unix(), time }));
            dispatch(openAddScheduleDialog());
        },
        updateSchedule: (schedule: Schedule, droppedCellDayOfTheWeek: number, droppedCellStartHour: number, droppedCellStartMinute: number): void => {
            const { date, time: { start, end } } = schedule;
            const { year, month, firstDateOfWeekTimeStamp } = localStorageApi.getCalendar();
            const droppedCellDate = dayjs(`${year}-${month}-${dayjs.unix(firstDateOfWeekTimeStamp).date() + droppedCellDayOfTheWeek}`);
            const droppedCellTimeStart = droppedCellDate.hour(droppedCellStartHour).minute(droppedCellStartMinute).unix();
            const diff = end - start;
            const newSchedule = {
                ...schedule,
                date: droppedCellDate.unix(),
                time: {
                    start: droppedCellTimeStart,
                    end: droppedCellTimeStart + diff,
                }
            }
            dispatch(asyncUpdateScheduleWithTimeValidate(date, newSchedule));
        },
    }
}

export default connect(null, mapDispatchToProps)(TimeTable);
