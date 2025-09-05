import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { initAuth } from './app/bootAuth.js'
import { startTabSync } from './app/tabSync'
import App from './App.jsx'

import './styles/index.css'
import './styles/global.css';

const tabSync = startTabSync(store);
if (tabSync) window.__tabSync = tabSync;
await initAuth(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
