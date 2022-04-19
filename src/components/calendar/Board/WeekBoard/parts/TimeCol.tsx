import { CalendarDate } from '../../../../../redux/selectors';
import TimeCell from '../containers/TimeCell';
import dayjs from 'dayjs';
import { isSameTime } from '../../../../../services/calendar';
import { TimeItem } from '../parts/TimeCell';


const TimeCol = (calendarDate: CalendarDate): JSX.Element[] => {
    const { date, dateSchedules } = calendarDate;
    const timeCol: JSX.Element[] = [];
    let timeDate = dayjs(`${date.year()}-${date.month() + 1}-${date.date()} 00:00`);
    for (let i = 0; i < 96; i++) {
        const timeItem: TimeItem = { date: timeDate, schedule: null };
        for (const schedule of dateSchedules) {
            if (isSameTime(schedule.time.start, timeDate.unix())) {
                timeItem.schedule = schedule;
            }
        }
        timeCol.push(<TimeCell key={timeDate.unix()} timeItem={timeItem} />);
        timeDate = timeDate.add(15, 'minute');
    };

    return timeCol;
}

export default TimeCol;
