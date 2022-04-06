import { Typography } from '@material-ui/core';
import { CalendarDate } from '../../../../../redux/selectors';


const DateHeader = (dates: CalendarDate[]) => {
    const dateHeader = dates.map((val, idx) => {
        return (
            <li key={idx}>
                <Typography
                    align="center"
                    component="div"
                    variant="caption"
                    color="textSecondary">
                    {val.date.date()}
                </Typography>
            </li>
        );
    });
    return dateHeader;
}

export default DateHeader;
