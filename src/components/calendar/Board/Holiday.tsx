import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => {
    return createStyles({
        schedule: {
            width: '90%',
            backgroundColor: 'rgb(19, 117, 63)',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '14px',
            padding: '1px 4px',
            margin: '1px 0',
            cursor: 'pointer',
        }
    });
});

type HolidayProps = {
    name: string;
}

const Holiday: React.FC<HolidayProps> = ({ name }) => {
    const classes = useStyles();
    return <div className={classes.schedule}>{name}</div>;
}

export default Holiday;
