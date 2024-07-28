import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'rsuite/Table/styles/index.css';
import 'rsuite/AutoComplete/styles/index.css';
import 'rsuite/Divider/styles/index.css';
import 'rsuite/Modal/styles/index.css';
import 'rsuite/DateRangePicker/styles/index.css';
import 'rsuite/Checkbox/styles/index.css';
import { store } from './store/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
