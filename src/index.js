import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { DockDynasty } from "./components/Dock-Dynasty"

localStorage.setItem("gg_user", 1);

  ReactDOM.render(
    <React.StrictMode>
    <Router>
      <DockDynasty />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
