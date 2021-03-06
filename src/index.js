import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
    <ThemeProvider theme={theme}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ThemeProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
