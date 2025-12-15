import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './COMPONENTS/Backend-main/App';
import { AuthProvider } from './COMPONENTS/Backend-main/AuthContext';
import React from 'react';
import GlobalLoaderBoundary from './COMPONENTS/Backend-main/GlobalLoaderBoundary';

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          background: '#fff0f0',
          color: '#b91c1c',
          border: '1px solid #fca5a5',
          borderRadius: '0.5rem',
          padding: '2rem',
          margin: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Something went wrong.</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  
    <ErrorBoundary>
      <GlobalLoaderBoundary>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GlobalLoaderBoundary>
    </ErrorBoundary>
)
