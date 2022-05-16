import React from 'react';
import { GridList } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Holiday } from '../../../../../redux/stateTypes';
import HolidayLabel from '../../base/HolidayLabel';

const useStyles = makeStyles(() => {
    return createStyles({
        week: {
            borderRight: '1px solid #ccc',
        }
    });
});

type OutterProps = {
    holidays: (Holiday | null)[];
}

type HolidayHeaderProps = OutterProps;

const HolidayHeader: React.FC<HolidayHeaderProps> = React.memo(({ holidays }) => {
    const classes = useStyles();

    return (
        <GridList className={classes.week} cols={7} spacing={0} cellHeight="auto">
            {holidays.map((holiday, idx) => (
                <li key={idx}>
                    {holiday && (<HolidayLabel name={holiday.name} margin='5px' />)}
                </li>
            ))}
        </GridList>
    );
});

export default HolidayHeader;
