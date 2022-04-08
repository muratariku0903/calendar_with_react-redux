import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';
import { CalendarDate } from '../../../../../redux/selectors';
import TimeCol from './TimeCol';


const useStyles = makeStyles(() => {
    return createStyles({
        dateHeader: {
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

const DateHeader = (dates: CalendarDate[]): JSX.Element[] => {
    const classes = useStyles();
    const dateHeader = dates.map((val, idx) => {
        return (
            <li key={idx}>
                <Typography
                    align="center"
                    component="div"
                    variant="caption"
                    color="textSecondary"
                    className={classes.dateHeader}
                >
                    {val.date.date()}
                </Typography>
                {TimeCol(val)}
            </li>
        );
    });
    return dateHeader;
}

export default DateHeader;
