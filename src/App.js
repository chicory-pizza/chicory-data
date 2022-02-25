// @flow

import convertCoordinatesToLevelId from './convertCoordinatesToLevelId';
import levelData from './level_data.json';
import LevelInspector from './LevelInspector';
import LevelSelector from './LevelSelector';
import React from 'react';
import {useState} from 'react';

import styles from './App.module.css';

export default function App(): React$Node {
	// for your custom queries on the browser console
	window.levelData = levelData;

	const [coordinates, setCoordinates] = useState<[number, number, number]>([
		0, 0, 0,
	]);

	return (
		<div className={styles.root}>
			<h1 className={styles.header}>Chicory Level Data</h1>

			<LevelSelector
				currentCoordinates={coordinates}
				levels={levelData}
				onNewCoordinates={setCoordinates}
			/>

			<LevelInspector
				level={levelData[convertCoordinatesToLevelId(coordinates)]}
			/>
		</div>
	);
}
