// @flow strict

import {useEffect, useState} from 'react';

import styles from './App.module.css';
import {CurrentCoordinatesProvider} from './CurrentCoordinatesContext';
import AppHeader from './header/AppHeader';
import DataSelector from './header/DataSelector';
import LevelSelector from './header/LevelSelector';
// $FlowFixMe[untyped-import]
import initialLevelsData from './level_data.json';
import LevelInspectorContainer from './LevelInspectorContainer';
import type {LevelType} from './types/LevelType';
import WorldMap from './WorldMap';

export default function App(): React$Node {
	const [levelsData, setLevelsData] =
		useState<{[levelId: string]: LevelType}>(initialLevelsData);
	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	useEffect(() => {
		window.levelsData = levelsData;
	}, [levelsData]);

	console.log('Use `window.levelsData` for your custom queries!');

	return (
		<CurrentCoordinatesProvider>
			<div className={styles.root}>
				<AppHeader
					dataSelector={
						<DataSelector levels={levelsData} onNewLevelsLoad={setLevelsData} />
					}
					levelSelector={<LevelSelector levels={levelsData} />}
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

				<WorldMap drawPreviews={drawPreviewsOnWorldMap} levels={levelsData} />

				<LevelInspectorContainer
					levels={levelsData}
					setLevelsData={setLevelsData}
				/>
			</div>
		</CurrentCoordinatesProvider>
	);
}
