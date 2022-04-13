import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { cellHeight } from '../constants';


const useStyles = makeStyles(() => {
    return createStyles({
        timeLabelBox: {
            marginTop: cellHeight('all'),
        },
        timeLabel: {
            marginTop: '1px',
            height: cellHeight('all'),
            textAlign: 'center',
            color: 'gray',
        },
    });
});


const SideTimeLabels: React.FC = () => {
    const classes = useStyles();
    const labels: JSX.Element[] = [];
    for (let label = 0; label < 24; label++) labels.push(<div key={label} className={classes.timeLabel}>{label}:00</div>);
    return (
        <div className={classes.timeLabelBox}>
            {labels}
        </div>
    );
};

export default SideTimeLabels;
