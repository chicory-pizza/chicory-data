// @flow strict

import {useEffect, useState} from 'react';

import styles from './App.module.css';
import {CurrentCoordinatesProvider} from './CurrentCoordinatesContext';
import AppHeader from './header/AppHeader';
import DataSelector from './header/DataSelector';
import LevelSelector from './header/LevelSelector';
// $FlowFixMe[untyped-import]
import initialLevelData from './level_data.json';
import LevelInspectorContainer from './LevelInspectorContainer';
import type {LevelType} from './types/LevelType';
import WorldMap from './WorldMap';

export default function App(): React$Node {
	const [levelData, setLevelData] =
		useState<{[levelId: string]: LevelType}>(initialLevelData);
	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	useEffect(() => {
		window.levelData = levelData;

		console.log('Use `window.levelData` for your custom queries!');
	}, [levelData]);

	return (
		<CurrentCoordinatesProvider>
			<div className={styles.root}>
				<AppHeader
					dataSelector={<DataSelector onNewLevelsLoad={setLevelData} />}
					levelSelector={<LevelSelector levels={levelData} />}
					levelSelectorSide={
						<label>
							<input
								checked={drawPreviewsOnWorldMap}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
									setDrawPreviewsOnWorldMap(ev.currentTarget.checked)
								}
								type="checkbox"
							/>{' '}
							Show previews on world map (slow)
						</label>
					}
				/>

				<WorldMap drawPreviews={drawPreviewsOnWorldMap} levels={levelData} />

				<LevelInspectorContainer levels={levelData} />
			</div>
		</CurrentCoordinatesProvider>
	);
}
