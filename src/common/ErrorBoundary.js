// @flow strict

import {Component} from 'react';

type Props = $ReadOnly<{
	canReload?: boolean,
	children: React$Node,
}>;

type State = $ReadOnly<{
	error: ?Error,
}>;

export default class ErrorBoundary extends Component<Props, State> {
	state: State = {
		error: null,
	};

	static getDerivedStateFromError(error: Error): State {
		return {error};
	}

	reload: () => void = () => {
		this.setState({error: null});
	};

	render(): React$Node {
		if (this.state.error) {
			return (
				<div>
					⚠️ Oops, something went wrong: <code>{this.state.error.message}</code>
					{this.props.canReload === true ? (
						<>
							{' '}
							<button onClick={this.reload} type="button">
								Reload
							</button>
						</>
					) : null}
				</div>
			);
		}

		return this.props.children;
	}
}
