import React from 'react';
import { makeStyles, createStyles, useMediaQuery } from '@material-ui/core';
import { cellHeight } from '../constants';
import { breakpoints } from '../../../../../constants';

type SideTimeLabelsStyleProps = {
    fontSize: string;
}

const useStyles = makeStyles(() => {
    return createStyles({
        timeLabelBox: {
            paddingTop: '50px',
            borderRight: '1px solid #ccc',
        },
        timeLabel: {
            fontSize: (props: SideTimeLabelsStyleProps) => props.fontSize,
            marginTop: '1px',
            height: cellHeight('all'),
            textAlign: 'center',
            color: 'gray',
        },
    });
});


const SideTimeLabels: React.FC = React.memo(() => {
    const isSizeXS = useMediaQuery(`(max-width:${breakpoints.xs}px)`);
    const classes = useStyles({ fontSize: isSizeXS ? '11px' : '18px' });
    const labels: JSX.Element[] = [];
    for (let label = 0; label < 24; label++) labels.push(<div key={label} className={classes.timeLabel}>{label}:00</div>);

    return (
        <div className={classes.timeLabelBox}>
            {labels}
        </div>
    );
});

export default SideTimeLabels;
