import React from 'react';

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
			console.log(error, ' ======is error');

			return (
				<React.Fragment>
					{!error ? (
						<WrappedComponent {...this.props} />
					) : (
						<div className="alert-messages">
							<div className="alert-message alert alert-danger">
								<h6>{error.toString()}</h6>
								<details className="details">
									{errorInfo && errorInfo.componentStack}
								</details>
							</div>
						</div>
					)}
				</React.Fragment>
			);
		}
	};

export default withErrorHandler;
