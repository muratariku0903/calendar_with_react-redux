import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';
import { CalendarDate } from '../../../../../redux/selectors';
import TimeCol from './TimeCol';
import HolidayLabel from '../../base/HolidayLabel';


const useStyles = makeStyles(() => {
    return createStyles({
        timeTable: {
            borderRight: '1px solid #ccc',
        },
        holidayLabelBox: {
            height: '3.5vh',
        },
    });
});

const TimeTable = (dates: CalendarDate[]): JSX.Element[] => {
    const classes = useStyles();
    const timeTable = dates.map((calendarDate, idx) => {
        return (
            <li key={idx}>
                <Typography
                    align="center"
                    component="div"
                    variant="caption"
                    color="textSecondary"
                    className={classes.timeTable}
                >
                    {calendarDate.date.date()}
                </Typography>
                <div className={classes.holidayLabelBox}>
                    {calendarDate.holiday && (<HolidayLabel name={calendarDate.holiday.name} margin='0' />)}
                </div>
                {TimeCol(calendarDate)}
            </li>
        );
    });
    return timeTable;
}

export default TimeTable;
