// @flow strict

import {Component} from 'react';

type Props = $ReadOnly<{
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

	render(): React$Node {
		if (this.state.error) {
			return (
				<div>
					⚠️ Oops, something went wrong: <code>{this.state.error.message}</code>
				</div>
			);
		}

		return this.props.children;
	}
}
