import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { weeks } from '../../../../constants';

const useStyles = makeStyles(() => {
    return createStyles({
        week: {
            borderRight: '1px solid #ccc',
            paddingTop: '10px',
        }
    });
});


const WeekHeader = (): JSX.Element[] => {
    const classes = useStyles();
    
    return weeks.map((week, idx) => {
        return (
            <li key={idx}>
                <Typography
                    className={classes.week}
                    align="center"
                    component="div"
                    variant="caption"
                    color="textSecondary">
                    {week}
                </Typography>
            </li>
        );
    });
};

export default WeekHeader;
