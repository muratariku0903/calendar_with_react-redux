import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CalendarState } from '../../../../redux/stateTypes';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        selectBox: {
            backgroundColor: 'white',
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
        <FormControl variant="filled">
            <Select
                value={boardType}
                onChange={(e) => setBoardType(e.target.value as keyof labelsType)}
                className={classes.selectBox}
            >
                {Object.keys(labels).map((label, idx) => {
                    return <MenuItem key={idx} value={label}>{labels[label as keyof labelsType]}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export default BoardTypeMenu;
