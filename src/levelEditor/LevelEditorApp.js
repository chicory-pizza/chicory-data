// @flow strict

import LevelEditorDataLoader from './LevelEditorDataLoader';
import LevelEditorUI from './LevelEditorUI';
import {WorldDataProvider} from './WorldDataContext';

export default function LevelEditorApp(): React$Node {
	return (
		<WorldDataProvider>
			<LevelEditorDataLoader>
				<LevelEditorUI />
			</LevelEditorDataLoader>
		</WorldDataProvider>
	);
}
