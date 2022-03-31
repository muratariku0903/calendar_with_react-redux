import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import DayjsUtils from '@date-io/dayjs';
import App from './App';
import dayjs from 'dayjs';
import "dayjs/locale/ja";
import './index.css';

dayjs.locale('ja');

ReactDOM.render(
    <React.StrictMode>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
