import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProviderComponent } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProviderComponent>
                <App />
            </AuthProviderComponent>
        </BrowserRouter>
    </React.StrictMode>
);
