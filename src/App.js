// @flow strict

import convertCoordinatesToLevelId from './convertCoordinatesToLevelId';
// $FlowFixMe[untyped-import]
import levelData from './level_data.json';
import LevelInspector from './LevelInspector';
import LevelSelector from './LevelSelector';
import {paintdogConsoleText} from './paintdogConsoleText';
import React from 'react';
import {useEffect, useState} from 'react';
import WorldMap from './WorldMap';

import styles from './App.module.css';

export default function App(): React$Node {
	window.levelData = levelData;

	useEffect(() => {
		console.log(paintdogConsoleText);
		console.log('Use `window.levelData` for your custom queries!');
	}, []);

	const [coordinates, setCoordinates] = useState<[number, number, number]>([
		0, 0, 0,
	]);

	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	return (
		<div className={styles.root}>
			<h1 className={styles.header}>Chicory Level Data</h1>

			<div className={styles.levelSelectorWrap}>
				<div className={styles.levelSelector}>
					<LevelSelector
						currentCoordinates={coordinates}
						levels={levelData}
						onNewCoordinates={setCoordinates}
					/>
				</div>

				<label>
					<input
						onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
							setDrawPreviewsOnWorldMap(ev.currentTarget.checked)
						}
						type="checkbox"
						value={drawPreviewsOnWorldMap}
					/>{' '}
					Show previews on world map (slow)
				</label>
			</div>

			<WorldMap
				currentCoordinates={coordinates}
				drawPreviews={drawPreviewsOnWorldMap}
				levels={levelData}
				onNewCoordinates={setCoordinates}
			/>

			<LevelInspector
				level={levelData[convertCoordinatesToLevelId(coordinates)]}
			/>
		</div>
	);
}
