// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional: For styling
import App from './App'; // Importing the App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This is where your React app will be rendered in the HTML file
);


