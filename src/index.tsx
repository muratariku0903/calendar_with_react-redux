import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import CalendarApp from './CalendarApp';
import dayjs from 'dayjs';

dayjs.locale('ja');

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CalendarApp />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
