// @flow strict

import ErrorBoundary from '../common/ErrorBoundary';

import styles from './LevelEditorApp.module.css';
import LevelEditorDataLoader from './LevelEditorDataLoader';
import LevelEditorUI from './LevelEditorUI';
import {WorldDataProvider} from './WorldDataContext';

export default function LevelEditorApp(): React$Node {
	return (
		<div className={styles.root}>
			<ErrorBoundary>
				<WorldDataProvider>
					<LevelEditorDataLoader>
						<LevelEditorUI />
					</LevelEditorDataLoader>
				</WorldDataProvider>
			</ErrorBoundary>
		</div>
	);
}
