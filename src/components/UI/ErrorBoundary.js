import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: null };
  }
  componentDidCatch(error) {
    console.log(error);
    this.setState({ ...this.state, hasError: error });
  }

  render() {
    if (this.state.hasError) return <h2>{this.state.hasError.message}</h2>;
    return <div>{this.props.children}</div>;
  }
}
export default ErrorBoundary;
