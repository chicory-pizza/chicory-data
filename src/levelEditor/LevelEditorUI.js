// @flow strict

import {useState} from 'react';
import {useParams} from 'react-router-dom';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import LoadingBigBanner from '../LoadingBigBanner';

import DataSelector from './header/DataSelector';
import LevelEditorUndoRedo from './header/LevelEditorUndoRedo';
import LevelSelector from './header/LevelSelector';
import styles from './LevelEditorUI.module.css';
import LevelIdFromRouterInvalid from './LevelIdFromRouterInvalid';
import LevelInspectorContainer from './LevelInspectorContainer';
import convertLevelIdToCoordinates from './util/convertLevelIdToCoordinates';
import {useWorldDataNullable} from './WorldDataContext';
import WorldMap from './worldMap/WorldMap';

export default function LevelEditorUI(): React$Node {
	const {worldData} = useWorldDataNullable();
	const {levelId} = useParams();

	const [drawPreviewsOnWorldMap, setDrawPreviewsOnWorldMap] = useState(true);

	let validLevelId = true;
	try {
		convertLevelIdToCoordinates(levelId);
	} catch (ex) {
		validLevelId = false;
	}

	return (
		<>
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
					) : (
						<div className={styles.levelSelectorPlaceholder} />
					)
				}
				levelSelectorSide={
					<>
						<LevelEditorUndoRedo />
						<label>
							<input
								checked={drawPreviewsOnWorldMap}
								onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
									setDrawPreviewsOnWorldMap(ev.currentTarget.checked)
								}
								type="checkbox"
							/>{' '}
							Show previews on world map
						</label>
					</>
				}
			/>

			{validLevelId ? (
				<>
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
				</>
			) : (
				<>
					<LevelIdFromRouterInvalid />

					{worldData == null ? <LoadingBigBanner /> : null}
				</>
			)}
		</>
	);
}
