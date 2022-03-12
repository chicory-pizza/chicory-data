// @flow strict

import {useEffect, useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import LoadingBigBanner from '../LoadingBigBanner';
import ConsoleNoJest from '../util/ConsoleNoJest';

import {CurrentCoordinatesProvider} from './CurrentCoordinatesContext';
import DataSelector from './header/DataSelector';
import LevelSelector from './header/LevelSelector';
import styles from './LevelEditorApp.module.css';
import LevelInspectorContainer from './LevelInspectorContainer';
import type {LevelType} from './types/LevelType';
import WorldMap from './WorldMap';

export default function LevelEditorApp(): React$Node {
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
		import('./level_data.json').then((initialLevelsData) =>
			setLevelsData(initialLevelsData.default)
		);
	}, []);

	return (
		<CurrentCoordinatesProvider>
			<AppHeader
				dataSelector={
					<ErrorBoundary>
						<DataSelector levels={levelsData} onNewLevelsLoad={setLevelsData} />
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
					<WorldMap drawPreviews={drawPreviewsOnWorldMap} levels={levelsData} />
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
		</CurrentCoordinatesProvider>
	);
}
