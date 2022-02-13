import React from 'react';
import { State } from '../../redux/types';
import { connect } from 'react-redux';
import {CalendarDate } from '../../redux/selectors';


type DateProps = {
    date: CalendarDate;
    currentDay: number;
}

const Date: React.FC<DateProps> = (props) => {
    const cellStyle = {
        normal: {
            color: 'black'
        },
        current: {
            color: 'blue',
            fontWeight: 'bold',
        }
    }

    const setStyle = () => {
        // ひちにだけじゃなくて、月と都市も確認しないと
        return props.date === props.currentDay ? cellStyle.current : cellStyle.normal;
    }

    return (
        <div style={setStyle()}>{props.date}</div>
    );
}

const mapStateToProps = (state: State) => {
    return {
        currentDay: state.calendar.currentDay,
    };
}

export default connect(mapStateToProps)(Date);
