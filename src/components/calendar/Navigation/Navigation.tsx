import React from 'react';
import { IconButton, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CalendarState } from '../../../redux/stateTypes';
import { getMonth } from '../../../services/calendar';


const StyledToolbar = withStyles({
    root: { padding: '0' }
})(Toolbar);

const StyledTypography = withStyles({
    root: { margin: '0 30px 0 10px' }
})(Typography);

const StyledDatePicker = withStyles({
    root: { marginLeft: '30' }
})(DatePicker);

export type StateProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
}

export type DispatchProps = {
    setMonth: (year: number, month: number) => void;
}

export type NavigationProps = StateProps & DispatchProps & {
    setPrevMonth: () => void;
    setNextMonth: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ year, month, setMonth, setPrevMonth, setNextMonth }) => {
    return (
        <StyledToolbar>
            <IconButton>
                <DehazeIcon />
            </IconButton>
            <StyledTypography color="textSecondary" variant="h5">カレンダー</StyledTypography>
            <Tooltip title='前月' placement='bottom'>
                <IconButton size="small" onClick={setPrevMonth}>
                    <ArrowBackIos />
                </IconButton>
            </Tooltip>
            <Tooltip title='次月' placement='bottom'>
                <IconButton size="small" onClick={setNextMonth}>
                    <ArrowForwardIos />
                </IconButton>
            </Tooltip>
            <StyledDatePicker
                value={getMonth(year, month)}
                onChange={d => d ? setMonth(d.year(), d.month() + 1) : alert('正しい日付を入力してください')}
                format="YYYY年 M月"
                variant='inline'
                animateYearScrolling disableToolbar />
        </StyledToolbar>
    );
}

export default Navigation;
