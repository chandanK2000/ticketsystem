import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import Loginform from './Loginform';
const root = ReactDOM.createRoot(document.getElementById('root'));

if (localStorage.getItem("tokenno") == null) {
  root.render(<Loginform />);

} else
  root.render(<App />);


reportWebVitals();
