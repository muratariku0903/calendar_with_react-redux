import React from 'react';
import { IconButton, Toolbar, Typography, withStyles, Tooltip } from '@material-ui/core';
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
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
    setMonth: (year: number, month: number) => void;
}

const Navigation: React.FC<NavigationProps> = (props) => {
    const onClickPrev = () => {
        let newYear = props.currentYear;
        let newMonth = props.currentMonth;
        if (newMonth === 1) {
            newYear--;
            newMonth = 12;
        } else {
            newMonth--;
        }
        props.setMonth(newYear, newMonth);
    }

    const onClickNext = () => {
        let newYear = props.currentYear;
        let newMonth = props.currentMonth;
        if (newMonth === 12) {
            newYear++;
            newMonth = 1;
        } else {
            newMonth++;
        }
        props.setMonth(newYear, newMonth);
    }

    const onChange = (dateObj: MaterialUiPickersDate) => {
        if (dateObj === null) {
            alert('正しい日付を入力してください');
        } else {
            props.setMonth(dateObj.year(), dateObj.month() + 1);
        }
    }

    return (
        <StyledToolbar>
            <IconButton>
                <DehazeIcon />
            </IconButton>
            <StyledTypography color="textSecondary" variant="h5">カレンダー</StyledTypography>
            <Tooltip title='前月' placement='bottom'>
                <IconButton size="small" onClick={onClickPrev}>
                    <ArrowBackIos />
                </IconButton>
            </Tooltip>
            <Tooltip title='次月' placement='bottom'>
                <IconButton size="small" onClick={onClickNext}>
                    <ArrowForwardIos />
                </IconButton>
            </Tooltip>
            <StyledDatePicker value={getMonth(props.currentYear, props.currentMonth)} variant='inline' onChange={onChange} format="YYYY年 M月" animateYearScrolling disableToolbar />
        </StyledToolbar>
    );
}

export default Navigation;
