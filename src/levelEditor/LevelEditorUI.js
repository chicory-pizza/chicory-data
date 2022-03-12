// @flow strict

import {useState} from 'react';
import {useParams} from 'react-router-dom';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import LoadingBigBanner from '../LoadingBigBanner';

import {CurrentCoordinatesProvider} from './CurrentCoordinatesContext';
import DataSelector from './header/DataSelector';
import LevelSelector from './header/LevelSelector';
import styles from './LevelEditorUI.module.css';
import LevelInspectorContainer from './LevelInspectorContainer';
import convertLevelIdToCoordinates from './util/convertLevelIdToCoordinates';
import {useWorldData} from './WorldDataContext';
import WorldMap from './worldMap/WorldMap';

export default function LevelEditorUI(): React$Node {
	const {levelId} = useParams();
	const [worldData] = useWorldData();

	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(false);

	let coordinates;
	try {
		coordinates = convertLevelIdToCoordinates(levelId);
	} catch (ex) {
		return 'Not a valid level ID';
	}

	console.log(levelId);

	return (
		<CurrentCoordinatesProvider defaultCoordinates={coordinates}>
			<AppHeader
				dataSelector={
					<ErrorBoundary>
						<DataSelector />
					</ErrorBoundary>
				}
				levelSelector={
					worldData ? (
						<ErrorBoundary>
							<LevelSelector />
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
					<WorldMap drawPreviews={drawPreviewsOnWorldMap} />
				</ErrorBoundary>
			) : null}

			{worldData != null ? (
				<ErrorBoundary>
					<LevelInspectorContainer />
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
