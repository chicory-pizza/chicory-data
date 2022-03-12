// @flow strict

import styles from './App.module.css';
import ErrorBoundary from './common/ErrorBoundary';
import LevelEditorApp from './levelEditor/LevelEditorApp';

export default function App(): React$Node {
	return (
		<div className={styles.root}>
			<ErrorBoundary>
				<LevelEditorApp />
			</ErrorBoundary>
		</div>
	);
}
