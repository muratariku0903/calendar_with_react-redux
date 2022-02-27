import React from 'react';
import ReactDOM from 'react-dom';
import DayjsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Provider } from 'react-redux';
import store from './redux/store';
import CalendarApp from './CalendarApp';
import dayjs from 'dayjs';
import "dayjs/locale/ja";

// sample
import counterStore from './sample/modules/store';
import Counter from './sample/components/Counter';
import CounterController from './sample/components/Controller';
import AsyncController from './sample/components/AsyncController';

dayjs.locale('ja');

const label = {
    inc: 'increment',
    dec: 'decrement'
}

ReactDOM.render(
    <React.StrictMode>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
            <Provider store={store}>
                <CalendarApp />
            </Provider>
        </MuiPickersUtilsProvider>

        <Provider store={counterStore}>
            <Counter label='increment' />
            <Counter label='decrement' />
            <CounterController label={label} />
            <AsyncController label={label} />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
