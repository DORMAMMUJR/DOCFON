import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
        <Toaster
            position="bottom-right"
            theme="dark"
            richColors
            toastOptions={{
                style: {
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                },
            }}
        />
    </React.StrictMode>
);
