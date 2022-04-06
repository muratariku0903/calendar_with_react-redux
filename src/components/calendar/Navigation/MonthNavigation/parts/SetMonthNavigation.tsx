import React, { Fragment } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CalendarState } from '../../../../../redux/stateTypes';
import { getMonth } from '../../../../../services/calendar';

const useStyles = makeStyles(() => {
    return createStyles({
        textField: {
            color: 'white',
            cursor: 'pointer',
        }
    });
});


type OutterProps = {
    year: CalendarState['year'];
    month: CalendarState['month'];
    setMonth: (year: number, month: number, firstDateOfWeek: number) => void;
    setPrevMonth: () => void;
    setNextMonth: () => void;
}

export type SetMonthNavigationProps = OutterProps;

const SetMonthNavigation: React.FC<SetMonthNavigationProps> = ({ year, month, setMonth, setPrevMonth, setNextMonth }) => {
    const classes = useStyles();
    return (
        <Fragment>
            <Tooltip title='前月' placement='bottom'>
                <IconButton size="small" onClick={setPrevMonth}>
                    <ArrowBackIos style={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <DatePicker
                value={getMonth(year, month)}
                onChange={d => d ? setMonth(d.year(), d.month() + 1, d.day(0).date()) : alert('正しい日付を入力してください')}
                format="YYYY年 M月"
                variant='inline'
                animateYearScrolling
                disableToolbar
                InputProps={{ className: classes.textField }}
            />
            <Tooltip title='次月' placement='bottom'>
                <IconButton size="small" onClick={setNextMonth}>
                    <ArrowForwardIos style={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
        </Fragment>
    );
}

export default SetMonthNavigation;
