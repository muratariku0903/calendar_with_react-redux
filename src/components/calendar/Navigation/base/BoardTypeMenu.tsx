import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { CalendarState } from '../../../../redux/stateTypes';

const useStyles = makeStyles(() => {
    return createStyles({
        selectWrapper: {
            marginRight: '5px',
        },
        selectBox: {
            borderRadius: '4px',
            backgroundColor: 'white',
            '&:after': {
                border: 'none',
            },
        },
        selectInput: {
            padding: '10px 12px',
        },
    });
});


type labelsType = {
    'month': string,
    'week': string,
}

type OutterProps = {
    boardType: CalendarState['type'];
    setBoardType: (type: CalendarState['type']) => void;
}

type BoardTypeMenuProps = OutterProps;

const BoardTypeMenu: React.FC<BoardTypeMenuProps> = ({ boardType, setBoardType }) => {
    const classes = useStyles();
    const labels: labelsType = {
        'month': '月',
        'week': '週',
    };
    return (
        <div className={classes.selectWrapper}>
            <Select
                value={boardType}
                onChange={(e) => setBoardType(e.target.value as keyof labelsType)}
                inputProps={{ className: classes.selectInput }}
                className={classes.selectBox}
            >
                {Object.keys(labels).map((label, idx) => {
                    return <MenuItem key={idx} value={label}>{labels[label as keyof labelsType]}</MenuItem>
                })}
            </Select>
        </div>
    );
}

export default BoardTypeMenu;
