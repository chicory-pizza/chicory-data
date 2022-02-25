// @flow strict

import type {LevelType} from './types/LevelType';

import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from './util/convertLevelIdToCoordinates';
import React from 'react';
import {useMemo, useState} from 'react';
import sortCompareCoordinates from './util/sortCompareCoordinates';

import styles from './LevelSelector.module.css';

type Props = {
	currentCoordinates: [number, number, number],
	levels: {[levelId: string]: LevelType},
	onNewCoordinates: (coordinates: [number, number, number]) => mixed,
};

export default function LevelSelector(props: Props): React$Node {
	const levelIds = useMemo(() => {
		const keys = Object.keys(props.levels);

		return keys.sort((a, b) => {
			return sortCompareCoordinates(
				convertLevelIdToCoordinates(a),
				convertLevelIdToCoordinates(b)
			);
		});
	}, [props.levels]);

	const layersGrouped: {[layer: number]: Array<[number, number, number]>} =
		useMemo(() => {
			return levelIds.reduce((prev, current) => {
				const coordinates = convertLevelIdToCoordinates(current);

				if (prev[coordinates[0]] == null) {
					prev[coordinates[0]] = [];
				}

				prev[coordinates[0]].push(coordinates);
				return prev;
			}, {});
		}, [levelIds]);

	const [inputCoordinates, setInputCoordinates] = useState(
		props.currentCoordinates
	);
	const [prevCoordinates, setPrevCoordinates] = useState(null);

	if (props.currentCoordinates !== prevCoordinates) {
		setInputCoordinates(props.currentCoordinates);
		setPrevCoordinates(props.currentCoordinates);
	}

	function changeLevelByMenu(ev: SyntheticEvent<HTMLSelectElement>) {
		const newLevelId = ev.currentTarget.value;

		const coordinates = convertLevelIdToCoordinates(newLevelId);
		props.onNewCoordinates(coordinates);
		setInputCoordinates(coordinates);
	}

	function changeLevelByNumberInput(ev: SyntheticEvent<HTMLFormElement>) {
		ev.preventDefault();

		if (!levelIds.includes(convertCoordinatesToLevelId(inputCoordinates))) {
			alert('Not a valid level');
			return;
		}

		props.onNewCoordinates(inputCoordinates);
	}

	return (
		<div className={styles.root}>
			<span className={styles.label}>Level:</span>

			<select
				className={styles.select}
				onChange={changeLevelByMenu}
				value={convertCoordinatesToLevelId(props.currentCoordinates)}
			>
				{Object.keys(layersGrouped).map((layer) => {
					return (
						<optgroup label={'Layer ' + layer} key={layer}>
							{layersGrouped[parseInt(layer, 10)].map((coordinates) => {
								const id = convertCoordinatesToLevelId(coordinates);

								const sublabel =
									props.levels[id].name !== id
										? props.levels[id].name
										: props.levels[id].area !== 'none'
										? props.levels[id].area
										: props.levels[id].palette;

								return (
									<option key={id} value={id}>
										{coordinates[0]}, {coordinates[1]}, {coordinates[2]}
										{sublabel !== '' ? ' (' + sublabel + ')' : ''}
									</option>
								);
							})}
						</optgroup>
					);
				})}
			</select>

			<form
				action="#"
				className={styles.numberInputForm}
				onSubmit={changeLevelByNumberInput}
			>
				<span className={styles.label}>Layer:</span>
				<input
					className={styles.numberInput}
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

				<button type="submit">Go</button>
			</form>
		</div>
	);
}
