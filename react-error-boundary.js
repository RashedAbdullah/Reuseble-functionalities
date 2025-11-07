    import React from 'react';
   
    class ErrorBoundary extends React.Component {
      state = { hasError: false, error: null };
   
      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }
   
      componentDidCatch(error, errorInfo) {
        console.error("Error caught by Error Boundary:", error, errorInfo);
      }
   
      render() {
        if (this.state.hasError) {
          return <h1>Something went wrong: {this.state.error.message}</h1>;
        }
        return this.props.children;
      }
    }
   
    export default ErrorBoundary;


// usecase
    import React from 'react';
    import ErrorBoundary from './ErrorBoundary'; 
   
    const MyComponent = () => {
      // Component logic here. For demonstration, we'll keep it simple.
      return <div>MyComponent content</div>;
    };
   
    const App = () => {
      return (
        <ErrorBoundary>
          <MyComponent />
        </ErrorBoundary>
      );
    };
   
    export default App;
