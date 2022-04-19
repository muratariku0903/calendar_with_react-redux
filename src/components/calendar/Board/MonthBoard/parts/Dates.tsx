import { CalendarDate } from '../../../../../redux/selectors';
import Date from '../containers/Date';


const Dates = (dates: CalendarDate[]) => {
    return dates.map((val, idx) => (
        <li key={idx}>
            <Date
                date={val.date}
                dateSchedules={val.dateSchedules}
                holiday={val.holiday}
            />
        </li>
    ));
}

export default Dates;
