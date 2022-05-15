import React from 'react';
import { GridList, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => {
    return createStyles({
        grid: {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        },
        week: {
            borderRight: '1px solid #ccc',
            paddingTop: '10px',
        }
    });
});

type OutterProps = {
    weeks: string[];
}

type WeekHeaderProps = OutterProps;

const WeekHeader: React.FC<WeekHeaderProps> = React.memo(({ weeks }) => {
    const classes = useStyles();

    return (
        <GridList className={classes.week} cols={7} spacing={0} cellHeight="auto">
            {weeks.map((week, idx) => (
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
            ))}
        </GridList>
    );
});

export default WeekHeader;
