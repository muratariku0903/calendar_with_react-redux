import { CalendarDate } from '../../../../../redux/selectors';
import TimeCell from '../containers/TimeCell';
import dayjs from 'dayjs';
import { isSameTime } from '../../../../../services/calendar';
import { TimeItem } from '../parts/TimeCell';


const TimeCol = (calendarDate: CalendarDate): JSX.Element[] => {
    const { date, dateSchedules, holiday } = calendarDate;
    const timeItems: TimeItem[] = [];
    let timeDate = dayjs(`${date.year()}-${date.month() + 1}-${date.date()} 00:00`);
    for (let i = 0; i < 48; i++) {
        const timeItem: TimeItem = { date: timeDate, schedule: null };
        for (const dateSchedule of dateSchedules) {
            if (dateSchedule.time.start && isSameTime(dateSchedule.time.start, timeDate.unix())) {
                timeItem.schedule = dateSchedule;
            }
        }
        timeItems.push(timeItem);
        timeDate = timeDate.add(30, 'minute');
    };

    const timeCol = timeItems.map((timeItem, idx) => {
        return (
            <TimeCell key={idx} timeItem={timeItem} />
        );
    });
    return timeCol;
}

export default TimeCol;
