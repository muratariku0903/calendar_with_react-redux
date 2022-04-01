import { Schedule, CalendarState } from '../../../../../redux/stateTypes';
import { CalendarDate } from '../../../../../redux/selectors';
import Date from '../containers/Date';


const Dates = (dates: CalendarDate[], openAddDialog: (date: Schedule['date']) => void, month: CalendarState['month']) => {
    const monthDates = dates.map((val, idx) => {
        return (
            <li key={idx} onClick={() => openAddDialog(val.date.unix())}>
                <Date
                    date={val.date}
                    dateSchedules={val.dateSchedules}
                    holiday={val.holiday}
                    month={month}
                />
            </li>
        );
    });
    return monthDates;
}

export default Dates;
