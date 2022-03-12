// @flow strict

import {useEffect, useMemo, useState} from 'react';

import changeDocumentTitle from '../../util/changeDocumentTitle';
import LevelLayerDropdownSelect from '../common/LevelLayerDropdownSelect';
import LevelLayerNumberInputs from '../common/LevelLayerNumberInputs';
import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import getLevelLabel from '../util/getLevelLabel';

import styles from './LevelSelector.module.css';

type Props = $ReadOnly<{
	levels: {[levelId: string]: LevelType},
}>;

export default function LevelSelector(props: Props): React$Node {
	const [currentCoordinates, setNewCoordinates] = useCurrentCoordinates();

	const levelsWithPlaceholder: {+[levelId: string]: ?LevelType} =
		useMemo(() => {
			const currentLevelId = convertCoordinatesToLevelId(currentCoordinates);
			const currentLevel = props.levels[currentLevelId];
			if (currentLevel != null) {
				return props.levels;
			}

			return {
				...props.levels,
				[currentLevelId]: null,
			};
		}, [currentCoordinates, props.levels]);

	// Change title
	useEffect(() => {
		const level: ?LevelType =
			props.levels[convertCoordinatesToLevelId(currentCoordinates)];

		changeDocumentTitle(getLevelLabel(currentCoordinates, level));
	}, [currentCoordinates, props.levels]);

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
