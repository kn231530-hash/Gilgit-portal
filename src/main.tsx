import {createRoot} from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import { GilgitPortalChatbot } from './components/GilgitPortalChatbot';
import './index.css';

createRoot(document.getElementById('root')!).render(<><App /><GilgitPortalChatbot /><Analytics /></>);
