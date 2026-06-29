
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import "./api/chart";

createRoot(document.getElementById('root')!).render(<App />);