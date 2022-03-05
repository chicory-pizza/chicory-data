// @flow strict

import {useEffect, useMemo, useState} from 'react';

import CustomSelect from '../common/CustomSelect';
import {useCurrentCoordinates} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import changeDocumentTitle from '../util/changeDocumentTitle';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';
import sortCompareCoordinates from '../util/sortCompareCoordinates';

import styles from './LevelSelector.module.css';

type Props = $ReadOnly<{
	levels: {[levelId: string]: LevelType},
}>;

export default function LevelSelector(props: Props): React$Node {
	const [currentCoordinates, setNewCoordinates] = useCurrentCoordinates();

	const levelIds = useMemo(() => {
		const keys = Object.keys(props.levels).concat(
			props.levels[convertCoordinatesToLevelId(currentCoordinates)] == null
				? [convertCoordinatesToLevelId(currentCoordinates)]
				: []
		);

		return keys.sort((a, b) => {
			return sortCompareCoordinates(
				convertLevelIdToCoordinates(a),
				convertLevelIdToCoordinates(b)
			);
		});
	}, [currentCoordinates, props.levels]);

	// Select stuff
	const selectOptions = useMemo(() => {
		return levelIds.map((id) => {
			const level: ?LevelType = props.levels[id];

			const coordinates = convertLevelIdToCoordinates(id);

			const sublabel =
				level != null
					? level.name !== id
						? level.name
						: level.area !== 'none'
						? level.area
						: level.palette
					: '';

			return {
				value: id,
				label: `${coordinates[0]}, ${coordinates[1]}, ${coordinates[2]}${
					sublabel !== '' ? ` (${sublabel})` : ''
				}`,
			};
		});
	}, [levelIds, props.levels]);

	const layersGrouped = useMemo(() => {
		const map = new Map();

		selectOptions.forEach((option) => {
			const layer = option.value[0];

			if (!map.has(layer)) {
				map.set(layer, {
					label: 'Layer ' + layer,
					options: [],
				});
			}

			map.get(layer)?.options.push(option);
		});

		return Array.from(map.values());
	}, [selectOptions]);

	const currentLevelId = convertCoordinatesToLevelId(currentCoordinates);
	const currentSelectOption = selectOptions.find(
		(option) => option.value === currentLevelId
	);

	useEffect(() => {
		changeDocumentTitle(currentSelectOption?.label ?? '');
	}, [currentSelectOption]);

	const [inputCoordinates, setInputCoordinates] = useState(currentCoordinates);
	const [prevCoordinates, setPrevCoordinates] = useState(null);

	if (currentCoordinates !== prevCoordinates) {
		setInputCoordinates(currentCoordinates);
		setPrevCoordinates(currentCoordinates);
	}

	function changeLevelBySelect(newOption) {
		const coordinates = convertLevelIdToCoordinates(newOption.value);

		setNewCoordinates(coordinates);
		setInputCoordinates(coordinates);
	}

	function changeLevelByNumberInput(ev: SyntheticEvent<HTMLFormElement>) {
		ev.preventDefault();

		setNewCoordinates(inputCoordinates);
	}

	return (
		<div className={styles.root}>
			<span className={styles.label}>Level:</span>

			<div className={styles.select}>
				<CustomSelect
					value={currentSelectOption}
					maxMenuHeight={1000}
					onChange={changeLevelBySelect}
					options={layersGrouped}
				/>
			</div>

			<form
				action="#"
				className={styles.numberInputForm}
				onSubmit={changeLevelByNumberInput}
			>
				<span className={styles.label}>Layer:</span>
				<input
					className={styles.numberInput}
					data-testid="levelselector-layer"
					onChange={(ev: SyntheticEvent<HTMLInputElement>) => {
						setInputCoordinates([
							parseInt(ev.currentTarget.value, 10),
							inputCoordinates[1],
							inputCoordinates[2],
						]);
					}}
					required
					type="number"
					value={inputCoordinates[0]}
				/>

				<span className={styles.label}>X:</span>
				<input
					className={styles.numberInput}
					data-testid="levelselector-x"
					onChange={(ev: SyntheticEvent<HTMLInputElement>) => {
						setInputCoordinates([
							inputCoordinates[0],
							parseInt(ev.currentTarget.value, 10),
							inputCoordinates[2],
						]);
					}}
					required
					type="number"
					value={inputCoordinates[1]}
				/>

				<span className={styles.label}>Y:</span>
				<input
					className={styles.numberInput}
					data-testid="levelselector-y"
					onChange={(ev: SyntheticEvent<HTMLInputElement>) => {
						setInputCoordinates([
							inputCoordinates[0],
							inputCoordinates[1],
							parseInt(ev.currentTarget.value, 10),
						]);
					}}
					required
					type="number"
					value={inputCoordinates[2]}
				/>

				<button data-testid="levelselector-go" type="submit">
					Go
				</button>
			</form>
		</div>
	);
}
