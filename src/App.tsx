import { BrowserRouter } from 'react-router-dom';
import { ClientPortalRoutes } from './routes/ClientPortalRoutes';
import { ThemeProvider } from './contexts/theme-context';
import './i18n';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ClientPortalRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
