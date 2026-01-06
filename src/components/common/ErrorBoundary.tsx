import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React errors
 * Provides a fallback UI when errors occur
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    // In production, you might want to log to an error reporting service
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

/**
 * Error fallback component with i18n support
 * Note: This is a functional component that can use hooks
 */
// eslint-disable-next-line react-refresh/only-export-components
const ErrorFallback = ({ error, onReset }: { error: Error | null; onReset: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('common.error')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {t('common.errorDescription')}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onReset} variant="primary">
            {t('common.retry')}
          </Button>
          <Button onClick={() => window.location.reload()} variant="secondary">
            {t('common.refreshPage')}
          </Button>
        </div>
        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              {t('common.errorDetails')}
            </summary>
            <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
              {error.toString()}
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

