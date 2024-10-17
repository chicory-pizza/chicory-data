// @flow strict

import {useParams} from 'react-router-dom';

import ErrorBoundary from '../common/ErrorBoundary';
import AppHeader from '../header/AppHeader';
import LoadingBigBanner from '../LoadingBigBanner';

import LevelEditorDataSelector from './header/LevelEditorDataSelector';
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

	let validLevelId = true;
	try {
		if (levelId != null) {
			convertLevelIdToCoordinates(levelId);
		} else {
			validLevelId = false;
		}
	} catch {
		validLevelId = false;
	}

	return (
		<>
			<AppHeader
				controls={
					<div className={styles.controls}>
						<div className={styles.flexGrow}>
							{worldData ? (
								<ErrorBoundary>
									<LevelSelector />
								</ErrorBoundary>
							) : (
								<div className={styles.levelSelectorPlaceholder} />
							)}
						</div>

						<LevelEditorUndoRedo />
					</div>
				}
				title="Level editor"
				titleSideStuff={
					<ErrorBoundary>
						<LevelEditorDataSelector />
					</ErrorBoundary>
				}
			/>

			{validLevelId ? (
				<>
					{worldData != null ? (
						<ErrorBoundary>
							<WorldMap />
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
