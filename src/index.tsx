import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import { Provider } from 'react-redux';
import store from './redux/store';
import CalendarApp from './CalendarApp';
import dayjs from 'dayjs';
import "dayjs/locale/ja";

dayjs.locale('ja');

ReactDOM.render(
    <React.StrictMode>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
            <Provider store={store}>
                <CalendarApp />
            </Provider>
        </MuiPickersUtilsProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
