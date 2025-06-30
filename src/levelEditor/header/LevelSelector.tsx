import {Button} from '@mantine/core';
import {useMemo, useState} from 'react';

import OpenGraph from '../../common/OpenGraph';
import useDocumentTitle from '../../util/useDocumentTitle';
import LevelLayerDropdownSelect from '../common/LevelLayerDropdownSelect';
import LevelLayerNumberInputs from '../common/LevelLayerNumberInputs';
import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertNullableCoordinatesToNonNull from '../util/convertNullableCoordinatesToNonNull';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './LevelSelector.module.css';

export default function LevelSelector() {
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
			[currentLevelId]: undefined,
		};
	}, [currentCoordinates, worldData]);

	// Change title
	const levelLabel = useMemo(() => {
		if (currentCoordinates == null) {
			return '';
		}

		return getLevelLabel(
			currentCoordinates,
			worldData[convertCoordinatesToLevelId(currentCoordinates)]
		);
	}, [currentCoordinates, worldData]);

	useDocumentTitle(levelLabel);

	// Inputs
	const [draftCoordinates, setDraftCoordinates] = useState<
		[number | null, number | null, number | null]
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

	function changeLevelByNumberInput(ev: React.SyntheticEvent<HTMLFormElement>) {
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
			<OpenGraph
				description={
					'View and edit level ' + levelLabel + ' in Chicory: A Colorful Tale'
				}
				title={levelLabel}
				url={
					currentCoordinates != null
						? 'level/' + convertCoordinatesToLevelId(currentCoordinates)
						: null
				}
			/>

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

				<Button data-testid="levelselector-go" type="submit" variant="default">
					Go
				</Button>
			</form>
		</div>
	);
}
