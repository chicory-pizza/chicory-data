// @flow strict

import {useEffect, useState} from 'react';

import styles from './App.module.css';
import ErrorBoundary from './common/ErrorBoundary';
import AppHeader from './header/AppHeader';
import {CurrentCoordinatesProvider} from './levelEditor/CurrentCoordinatesContext';
import DataSelector from './levelEditor/header/DataSelector';
import LevelSelector from './levelEditor/header/LevelSelector';
import LevelInspectorContainer from './levelEditor/LevelInspectorContainer';
import type {LevelType} from './levelEditor/types/LevelType';
import WorldMap from './levelEditor/WorldMap';
import LoadingBigBanner from './LoadingBigBanner';
import ConsoleNoJest from './util/ConsoleNoJest';

export default function App(): React$Node {
	const [levelsData, setLevelsData] =
		useState<?{[levelId: string]: LevelType}>(null);
	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	useEffect(() => {
		window.levelsData = levelsData;
	}, [levelsData]);

	useEffect(() => {
		ConsoleNoJest.log('Use `window.levelsData` for your custom queries!');
	}, []);

	useEffect(() => {
		// $FlowFixMe[untyped-import]
		import('./levelEditor/level_data.json').then((initialLevelsData) =>
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
