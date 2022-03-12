// @flow strict

import {useState} from 'react';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import LoadingBigBanner from '../LoadingBigBanner';

import {CurrentCoordinatesProvider} from './CurrentCoordinatesContext';
import DataSelector from './header/DataSelector';
import LevelSelector from './header/LevelSelector';
import styles from './LevelEditorUI.module.css';
import LevelInspectorContainer from './LevelInspectorContainer';
import {useWorldData} from './WorldDataContext';
import WorldMap from './WorldMap';

export default function LevelEditorUI(): React$Node {
	const [worldData, setWorldData] = useWorldData();

	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	return (
		<CurrentCoordinatesProvider>
			<AppHeader
				dataSelector={
					<ErrorBoundary>
						<DataSelector levels={worldData} onNewLevelsLoad={setWorldData} />
					</ErrorBoundary>
				}
				levelSelector={
					worldData ? (
						<ErrorBoundary>
							<LevelSelector levels={worldData} />
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

			{worldData != null ? (
				<ErrorBoundary>
					<WorldMap drawPreviews={drawPreviewsOnWorldMap} levels={worldData} />
				</ErrorBoundary>
			) : null}

			{worldData != null ? (
				<ErrorBoundary>
					<LevelInspectorContainer
						levels={worldData}
						setWorldData={setWorldData}
					/>
				</ErrorBoundary>
			) : null}

			{worldData == null ? (
				<div className={styles.loading}>
					<LoadingBigBanner />
				</div>
			) : null}
		</CurrentCoordinatesProvider>
	);
}
