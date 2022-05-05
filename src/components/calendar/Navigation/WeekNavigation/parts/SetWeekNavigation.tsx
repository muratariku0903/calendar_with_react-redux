import React, { Fragment } from 'react';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { CalendarState } from '../../../../../redux/stateTypes';


type OutterProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    setPrevWeek: () => void;
    setNextWeek: () => void;
}

export type SetWeekNavigationProps = OutterProps;

const SetWeekNavigation: React.FC<SetWeekNavigationProps> = ({ year, month, setPrevWeek, setNextWeek }) => {
    return (
        <Fragment>
            <Tooltip title='前週' placement='bottom'>
                <IconButton size="small" onClick={setPrevWeek}>
                    <ArrowBackIos style={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Typography>{year}年{month}月</Typography>
            <Tooltip title='次週' placement='bottom'>
                <IconButton size="small" onClick={setNextWeek}>
                    <ArrowForwardIos style={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
        </Fragment>
    );
}

export default SetWeekNavigation;
