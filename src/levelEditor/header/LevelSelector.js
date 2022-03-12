// @flow strict

import {useEffect, useMemo, useState} from 'react';

import changeDocumentTitle from '../../util/changeDocumentTitle';
import LevelLayerDropdownSelect from '../common/LevelLayerDropdownSelect';
import LevelLayerNumberInputs from '../common/LevelLayerNumberInputs';
import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './LevelSelector.module.css';

export default function LevelSelector(): React$Node {
	const [worldData] = useWorldDataNonNullable();
	const [currentCoordinates, setNewCoordinates] = useCurrentCoordinates();

	const levelsWithPlaceholder = useMemo(() => {
		const currentLevelId = convertCoordinatesToLevelId(currentCoordinates);
		const currentLevel = worldData[currentLevelId];
		if (currentLevel != null) {
			return worldData;
		}

		return {
			...worldData,
			[currentLevelId]: null,
		};
	}, [currentCoordinates, worldData]);

	// Change title
	useEffect(() => {
		const level: ?LevelType =
			worldData[convertCoordinatesToLevelId(currentCoordinates)];

		changeDocumentTitle(getLevelLabel(currentCoordinates, level));
	}, [currentCoordinates, worldData]);

	// Inputs
	const [draftCoordinates, setDraftCoordinates] = useState<
		[?number, ?number, ?number]
	>([currentCoordinates[0], currentCoordinates[1], currentCoordinates[2]]);
	const [prevCoordinates, setPrevCoordinates] = useState(currentCoordinates);

	if (currentCoordinates !== prevCoordinates) {
		setDraftCoordinates([
			currentCoordinates[0],
			currentCoordinates[1],
			currentCoordinates[2],
		]);
		setPrevCoordinates(currentCoordinates);
	}

	function changeLevelBySelect(coordinates) {
		setNewCoordinates(coordinates);
		setDraftCoordinates([coordinates[0], coordinates[1], coordinates[2]]);
	}

	function changeLevelByNumberInput(ev: SyntheticEvent<HTMLFormElement>) {
		ev.preventDefault();

		if (
			draftCoordinates[0] != null &&
			draftCoordinates[1] != null &&
			draftCoordinates[2] != null
		) {
			setNewCoordinates([
				draftCoordinates[0],
				draftCoordinates[1],
				draftCoordinates[2],
			]);
		}
	}

	return (
		<div className={styles.root}>
			<span className={styles.label}>Level:</span>

			<div className={styles.select}>
				<LevelLayerDropdownSelect
					levels={levelsWithPlaceholder}
					onNewCoordinatesSet={changeLevelBySelect}
					selectedCoordinates={currentCoordinates}
				/>
			</div>

			<form
				action="#"
				className={styles.numberInputForm}
				onSubmit={changeLevelByNumberInput}
			>
				<LevelLayerNumberInputs
					coordinates={draftCoordinates}
					onNewCoordinatesSet={setDraftCoordinates}
					testIdPrefix="levelselector"
				/>

				<button data-testid="levelselector-go" type="submit">
					Go
				</button>
			</form>
		</div>
	);
}
