import React from 'react';
import { GridList, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Dayjs } from 'dayjs';

const useStyles = makeStyles(() => {
    return createStyles({
        week: {
            borderRight: '1px solid #ccc',
        }
    });
});

type OutterProps = {
    dates: Dayjs[];
}

type DateHeaderProps = OutterProps;

const DateHeader: React.FC<DateHeaderProps> = React.memo(({ dates }) => {
    const classes = useStyles();

    return (
        <GridList className={classes.week} cols={7} spacing={0} cellHeight="auto">
            {dates.map((date, idx) => (
                <li key={idx}>
                    <Typography
                        className={classes.week}
                        align="center"
                        component="div"
                        variant="caption"
                        color="textSecondary">
                        {date.date()}
                    </Typography>
                </li>
            ))}
        </GridList>
    );
});

export default DateHeader;
