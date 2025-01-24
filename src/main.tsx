import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
import './index.css';
import { useUserStore } from './stores/Store.UserStore';

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
