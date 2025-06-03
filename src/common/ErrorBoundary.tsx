import {Component} from 'react';

type Props = Readonly<{
	canReload?: boolean;
	children: React.ReactNode;
}>;

type State = Readonly<{
	error: Error | null;
}>;

export default class ErrorBoundary extends Component<Props, State> {
	state: State = {
		error: null,
	};

	static getDerivedStateFromError(error: Error): State {
		return {error};
	}

	reload = () => {
		this.setState({error: null});
	};

	render() {
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
