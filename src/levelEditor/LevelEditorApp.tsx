import styles from './LevelEditorApp.module.css';
import LevelEditorDataLoader from './LevelEditorDataLoader';
import LevelEditorUI from './LevelEditorUI';
import {WorldDataProvider} from './WorldDataContext';

export default function LevelEditorApp() {
	return (
		<div className={styles.root}>
			<WorldDataProvider>
				<LevelEditorDataLoader>
					<LevelEditorUI />
				</LevelEditorDataLoader>
			</WorldDataProvider>
		</div>
	);
}
