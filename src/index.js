import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';
import {Ion} from "cesium";

WebFont.load({
    google: {
        families: ['Open Sans', 'sans-serif']
    }
});


// Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZmE0MTY3ZS0xYmNhLTQ5ODYtYWYzMC1hYjk1YzNjYWQyNTkiLCJpZCI6MTYyNjksInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NzAwMzk1MDZ9.1h2RrjbaSGg75mV1JhTi8dNLOR04938Wk-3XbqXOfQc";
Ion.defaultAccessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjcwZmE1Mi1mMjBjLTRkYjktODI2OS00YTQzY2NjZGFiZTMiLCJpZCI6MTAyNTUsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODMyNDkzNzB9.HV080mvpn5i7CMTI0SnFZaWN-8pn5uCVfAbb8ScoKqQ'



axios.defaults.baseURL = 'https://ogc-3d-iot-pilot.sensorup.com';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
