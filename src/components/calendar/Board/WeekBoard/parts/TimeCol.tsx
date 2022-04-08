import { makeStyles, createStyles } from '@material-ui/core';
import { CalendarDate } from '../../../../../redux/selectors';
import dayjs, { Dayjs } from 'dayjs';


const useStyles = makeStyles(() => {
    return createStyles({
        gridCell: {
            height: '3.5vh',
            borderTop: '1px solid #ccc',
            borderLeft: '1px solid #ccc',
            textAlign: 'center',
        },
    });
});

const TimeCol = (calendarDate: CalendarDate): JSX.Element[] => {
    const { date, dateSchedules, holiday } = calendarDate;
    const classes = useStyles();
    const timeDates: Dayjs[] = [];
    let timeDate = dayjs(`${date.year()}-${date.month() + 1}-${date.date()} 00:00`);
    for (let i = 0; i < 24; i++) {
        timeDates.push(timeDate);
        timeDate = timeDate.add(30, 'minute');
    };
    console.log(timeDates);

    const timeCol = timeDates.map((timeDate, idx) => {
        // schedulesも回して、スタート時間が重なっているか判定
        return (
            <div key={idx} className={classes.gridCell}>
                hello
            </div>
        );
    });
    return timeCol;
}

export default TimeCol;
