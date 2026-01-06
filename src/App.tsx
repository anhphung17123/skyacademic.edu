import { BrowserRouter } from 'react-router-dom';
import { ClientPortalRoutes } from './routes/ClientPortalRoutes';
import { ThemeProvider } from './contexts/theme-context';
import { PageThemeProvider } from './contexts/page-theme-context';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './i18n';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <PageThemeProvider>
            <ClientPortalRoutes />
          </PageThemeProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
