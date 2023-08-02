import React from 'react';
import ReactDOM from 'react-dom/client';

import { Routes } from './routes';
import { AuthContextProvider } from './context/AuthContext';

import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthContextProvider>
			<Routes />
		</AuthContextProvider>
	</React.StrictMode>
);
