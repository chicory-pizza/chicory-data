// @flow

import levelData from './level_data.json';
import LevelPreview from './LevelPreview';
import React from 'react';

import './App.css';

export default function App(): React$Node {
	window.levelData = levelData;

	// do 0_0_0 as sample first

	return (
		<div className="App">
			<h1>chicory-level-data</h1>
			<LevelPreview level={levelData['0_0_0']} />
		</div>
	);
}
