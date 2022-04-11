import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';
import { CalendarDate } from '../../../../../redux/selectors';
import TimeCol from './TimeCol';


const useStyles = makeStyles(() => {
    return createStyles({
        timeTable: {
            borderLeft: '1px solid #ccc',
        },
        gridCell: {
            height: '3.5vh',
            borderTop: '1px solid #ccc',
            borderLeft: '1px solid #ccc',
            textAlign: 'center',
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
                {TimeCol(calendarDate)}
            </li>
        );
    });
    return timeTable;
}

export default TimeTable;
