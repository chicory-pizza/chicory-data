// @flow strict

import {useEffect, useState} from 'react';

import styles from './App.module.css';
import {CurrentCoordinatesProvider} from './CurrentCoordinatesContext';
import ErrorBoundary from './ErrorBoundary';
import AppHeader from './header/AppHeader';
import DataSelector from './header/DataSelector';
import LevelSelector from './header/LevelSelector';
import LevelInspectorContainer from './LevelInspectorContainer';
import LoadingBigBanner from './LoadingBigBanner';
import type {LevelType} from './types/LevelType';
import WorldMap from './WorldMap';

export default function App(): React$Node {
	const [levelsData, setLevelsData] =
		useState<?{[levelId: string]: LevelType}>(null);
	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	useEffect(() => {
		window.levelsData = levelsData;
	}, [levelsData]);

	useEffect(() => {
		console.log('Use `window.levelsData` for your custom queries!');
	}, []);

	useEffect(() => {
		// $FlowFixMe[untyped-import]
		import('./level_data.json').then((initialLevelsData) =>
			setLevelsData(initialLevelsData.default)
		);
	}, []);

	return (
		<CurrentCoordinatesProvider>
			<div className={styles.root}>
				<AppHeader
					dataSelector={
						<ErrorBoundary>
							<DataSelector
								levels={levelsData}
								onNewLevelsLoad={setLevelsData}
							/>
						</ErrorBoundary>
					}
					levelSelector={
						levelsData ? (
							<ErrorBoundary>
								<LevelSelector levels={levelsData} />
							</ErrorBoundary>
						) : null
					}
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

				{levelsData != null ? (
					<ErrorBoundary>
						<WorldMap
							drawPreviews={drawPreviewsOnWorldMap}
							levels={levelsData}
						/>
					</ErrorBoundary>
				) : null}

				{levelsData != null ? (
					<ErrorBoundary>
						<LevelInspectorContainer
							levels={levelsData}
							setLevelsData={setLevelsData}
						/>
					</ErrorBoundary>
				) : null}

				{levelsData == null ? (
					<div className={styles.loading}>
						<LoadingBigBanner />
					</div>
				) : null}
			</div>
		</CurrentCoordinatesProvider>
	);
}
