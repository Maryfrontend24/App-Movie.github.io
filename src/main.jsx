import { createRoot } from 'react-dom/client';
import './main.css';
import 'antd/dist/antd.js';

// eslint-disable-next-line no-unused-vars
import App from './App.jsx';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(<App />);
