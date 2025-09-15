/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * The main entry point for the React application.
 * It finds the root DOM element and renders the main `App` component into it.
 * The application is wrapped in `React.StrictMode` to highlight potential problems.
 *
 * @throws {Error} If the root DOM element with the ID 'root' is not found.
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element with ID 'root' to mount the application.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
