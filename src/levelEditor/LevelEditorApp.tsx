import styles from './LevelEditorApp.module.css';
import {LevelEditorProvider} from './LevelEditorContext';
import LevelEditorDataLoader from './LevelEditorDataLoader';
import LevelEditorUI from './LevelEditorUI';
import {WorldDataProvider} from './WorldDataContext';

export default function LevelEditorApp() {
	return (
		<div className={styles.root}>
			<WorldDataProvider>
				<LevelEditorDataLoader>
					<LevelEditorProvider>
						<LevelEditorUI />
					</LevelEditorProvider>
				</LevelEditorDataLoader>
			</WorldDataProvider>
		</div>
	);
}
