import React, { useState } from 'react';
import { IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { DatePicker } from '@material-ui/pickers';
import { CalendarActions } from '../../../redux/actions';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Dayjs } from 'dayjs';
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

type NavigationProps = {
    currentYear: number;
    currentMonth: number;
    setMonth: (year: number, month: number) => CalendarActions;
}

const Navigation: React.FC<NavigationProps> = (props) => {
    const onClickPrev = () => {
        let newYear = props.currentYear;
        let newMonth = props.currentMonth;
        if (newMonth === 0) {
            newYear--;
            newMonth = 11;
        } else {
            newMonth--;
        }
        props.setMonth(newYear, newMonth);
    }

    const onClickNext = () => {
        let newYear = props.currentYear;
        let newMonth = props.currentMonth;
        if (newMonth === 11) {
            newYear++;
            newMonth = 0;
        } else {
            newMonth++;
        }
        props.setMonth(newYear, newMonth);
    }

    const onChange = (dateObj: MaterialUiPickersDate) => {
        if (dateObj === null) {
            alert('正しい日付を入力してください');
        } else {
            props.setMonth(dateObj.year(), dateObj.month());
        }
    }

    return (
        <StyledToolbar>
            <IconButton>
                <DehazeIcon />
            </IconButton>
            <StyledTypography color="textSecondary" variant="h5">カレンダー</StyledTypography>
            <IconButton size="small">
                <ArrowBackIos onClick={onClickPrev} />
            </IconButton>
            <IconButton size="small">
                <ArrowForwardIos onClick={onClickNext} />
            </IconButton>
            <StyledDatePicker value={getMonth(props.currentYear, props.currentMonth + 1)} variant='inline' onChange={onChange} format="YYYY年 M月" animateYearScrolling disableToolbar />
        </StyledToolbar>
    );
}

export default Navigation;
