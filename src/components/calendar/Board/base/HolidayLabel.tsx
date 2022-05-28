import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { breakpoints } from '../../../../constants';

type HolidayLabelStyleProps = {
    width: string;
    margin: string;
};

const useStyles = makeStyles(() => {
    return createStyles({
        schedule: {
            width: (props: HolidayLabelStyleProps) => props.width,
            height: '23px',
            margin: (props: HolidayLabelStyleProps) => props.margin,
            padding: '1px 4px',
            backgroundColor: 'rgb(19, 117, 63)',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            lineHeight: '23px',
        }
    });
});

type HolidayProps = {
    name: string;
    margin: string;
}

const HolidayLabel: React.FC<HolidayProps> = ({ name, margin }) => {
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);
    const classes = useStyles({ margin, width: isSizeXS ? '75%' : '90%' });
    return <div className={classes.schedule}>{name}</div>;
}

export default HolidayLabel;
