// @flow strict

import {CurrentCoordinatesProvider} from './CurrentCoordinatesContext';
// $FlowFixMe[untyped-import]
import levelData from './level_data.json';
import LevelInspectorContainer from './LevelInspectorContainer';
import LevelSelector from './LevelSelector';
import {paintdogConsoleText} from './util/paintdogConsoleText';
import React from 'react';
import {useEffect, useState} from 'react';
import WorldMap from './WorldMap';

import icon144 from './icon144.png';
import styles from './App.module.css';

export default function App(): React$Node {
	window.levelData = levelData;

	useEffect(() => {
		console.log(paintdogConsoleText);
		console.log('Use `window.levelData` for your custom queries!');
	}, []);

	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	return (
		<CurrentCoordinatesProvider>
			<div className={styles.root}>
				<div className={styles.header}>
					<img src={icon144} alt="Chicory Data" width={72} height={72} />

					<div className={styles.headerContent}>
						<h1 className={styles.title}>Chicory Data</h1>

						<div className={styles.levelSelectorWrap}>
							<div className={styles.levelSelector}>
								<LevelSelector levels={levelData} />
							</div>

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
						</div>
					</div>
				</div>

				<WorldMap drawPreviews={drawPreviewsOnWorldMap} levels={levelData} />

				<LevelInspectorContainer levels={levelData} />
			</div>
		</CurrentCoordinatesProvider>
	);
}
