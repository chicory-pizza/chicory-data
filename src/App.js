// @flow

import levelData from './level_data.json';
import LevelInspector from './LevelInspector';
import React from 'react';

import styles from './App.module.css';

export default function App(): React$Node {
	window.levelData = levelData;

	// do 0_0_0 as sample first

	return (
		<div className={styles.root}>
			<h1>chicory-level-data</h1>

			<LevelInspector level={levelData['0_0_0']} />
		</div>
	);
}
