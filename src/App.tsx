import { AdminPanel } from './components/AdminPanel';
import OrkenSite from './components/OrkenSite';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/admin') return <AdminPanel />;
  return <OrkenSite />;
}
