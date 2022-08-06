// @flow strict

import {useEffect, useMemo, useState} from 'react';

import changeDocumentTitle from '../../util/changeDocumentTitle';
import LevelLayerDropdownSelect from '../common/LevelLayerDropdownSelect';
import LevelLayerNumberInputs from '../common/LevelLayerNumberInputs';
import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertNullableCoordinatesToNonNull from '../util/convertNullableCoordinatesToNonNull';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './LevelSelector.module.css';

export default function LevelSelector(): React$Node {
	const {worldData} = useWorldDataNonNullable();
	const [currentCoordinates, setNewCoordinates] = useCurrentCoordinates();

	const levelsWithPlaceholder = useMemo(() => {
		if (currentCoordinates == null) {
			return worldData;
		}

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
		if (currentCoordinates == null) {
			return;
		}

		const level: ?LevelType =
			worldData[convertCoordinatesToLevelId(currentCoordinates)];

		changeDocumentTitle(getLevelLabel(currentCoordinates, level));
	}, [currentCoordinates, worldData]);

	// Inputs
	const [draftCoordinates, setDraftCoordinates] = useState<
		[?number, ?number, ?number]
	>(
		currentCoordinates
			? [currentCoordinates[0], currentCoordinates[1], currentCoordinates[2]]
			: [null, null, null]
	);
	const [prevCoordinates, setPrevCoordinates] = useState(currentCoordinates);

	if (currentCoordinates !== prevCoordinates) {
		setDraftCoordinates([
			currentCoordinates ? currentCoordinates[0] : null,
			currentCoordinates ? currentCoordinates[1] : null,
			currentCoordinates ? currentCoordinates[2] : null,
		]);
		setPrevCoordinates(currentCoordinates);
	}

	function changeLevelBySelect(coordinates: [number, number, number]) {
		setNewCoordinates(coordinates);
		setDraftCoordinates([coordinates[0], coordinates[1], coordinates[2]]);
	}

	function changeLevelByNumberInput(ev: SyntheticEvent<HTMLFormElement>) {
		ev.preventDefault();

		const newCoordinates =
			convertNullableCoordinatesToNonNull(draftCoordinates);
		if (newCoordinates == null) {
			alert('Please enter the coordinates.');
			return;
		}

		setNewCoordinates(newCoordinates);
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
