import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import { getCalendarCells, CalendarCell } from '../../redux/selectors';


const WeekHeader = () => {
    const weeks = ['日', '月', '火', '水', '木', '金', '土'];

    return (
        <thead>
            <tr>
                {weeks.map((week, idx) => {
                    return <th key={idx}>{week}</th>
                })}
            </tr>
        </thead>
    );
}

export default WeekHeader;
