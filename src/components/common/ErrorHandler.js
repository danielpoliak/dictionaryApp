import React from 'react';

/**
 * Higher order Component which catches FE errors happening in render method...
 * I have created this component with older React version where I used only classes and functional stateless components without
 * REACT hooks and it worked like a charm. Not sure if it's hooks or different dev env/mode, it catches the error, renders my
 * error display Node but in a second also renders error stack trace (dev mode) which can be dismised and app works as it
 * should with proper error handling (in my original implementation, errors are caught and no uncaught error stack trace is displayed)
 * @param {Node} WrappedComponent
 * @returns {Node|null} returns WrappedComponent or null in case of error
 */
const withErrorHandler = WrappedComponent =>
	class extends React.Component {
		state = {
			error: null,
			errorInfo: null
		};

		componentDidCatch(error, errorInfo) {
			this.setState({
				error,
				errorInfo
			});
		}

		render() {
			const { error, errorInfo } = this.state;
			return (
				<React.Fragment>
					{!error ? (
						<WrappedComponent {...this.props} />
					) : (
						<div className="alert alert-danger">
							<h6>{error.toString()}</h6>
							<details className="details">
								{errorInfo && errorInfo.componentStack}
							</details>
						</div>
					)}
				</React.Fragment>
			);
		}
	};

export default withErrorHandler;
