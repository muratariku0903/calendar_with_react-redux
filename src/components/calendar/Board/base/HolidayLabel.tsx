import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

type Props = {
    margin: string;
};

const useStyles = makeStyles(() => {
    return createStyles({
        schedule: {
            width: '90%',
            backgroundColor: 'rgb(19, 117, 63)',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            padding: '1px 4px',
            margin: (props: Props) => props.margin,
        }
    });
});

type HolidayProps = {
    name: string;
    margin: string;
}

const HolidayLabel: React.FC<HolidayProps> = ({ name, margin }) => {
    const classes = useStyles({ margin });
    return <div className={classes.schedule}>{name}</div>;
}

export default HolidayLabel;
