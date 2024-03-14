import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI when an error occurs
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return (

        <div>
          <div className='text-center'style={{textAlign:'center'}}>
          <h4>Something went wrong.</h4>
          <p style={{textAlign:'center'}}>Please try again later.</p>
          </div>
        </div>
      );
    }

    // Render the children components when no error occurs
    return this.props.children;
  }
}

export default ErrorBoundary;
