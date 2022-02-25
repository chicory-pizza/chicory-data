// @flow strict

import type {LevelType} from './types/LevelType';

import isSameCoordinates from './isSameCoordinates';
import convertCoordinatesToLevelId from './convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from './convertLevelIdToCoordinates';
import React from 'react';
import {useEffect, useRef} from 'react';

import styles from './WorldMap.module.css';

const WIDTH = 60;
const HEIGHT = parseInt(WIDTH * (1080 / 1920), 10);

type Props = {
	currentCoordinates: [number, number, number],
	levels: {[levelId: string]: LevelType},
	onNewCoordinates: (coordinates: [number, number, number]) => mixed,
};

export default function WorldMap(props: Props): React$Node {
	const currentBox = useRef<?HTMLButtonElement>(null);

	let minX = 0;
	let minY = 0;

	const levels = Object.keys(props.levels)
		.map((levelId) => {
			const coordinates = convertLevelIdToCoordinates(levelId);
			if (coordinates[0] !== props.currentCoordinates[0]) {
				return null;
			}

			minX = Math.min(minX, coordinates[1]);
			minY = Math.min(minY, coordinates[2]);

			return coordinates;
		})
		.filter(Boolean);

	useEffect(() => {
		currentBox.current?.scrollIntoView({
			block: 'center',
			inline: 'center',
		});
	}, [props.currentCoordinates]);

	return (
		<div className={styles.root}>
			{levels.map((coordinates) => {
				const levelId = convertCoordinatesToLevelId(coordinates);

				const isSame = isSameCoordinates(props.currentCoordinates, coordinates);

				const sublabel =
					props.levels[levelId].area !== 'none'
						? props.levels[levelId].area
						: props.levels[levelId].palette;

				return (
					<button
						className={styles.box + ' ' + (isSame ? styles.currentBox : '')}
						key={convertCoordinatesToLevelId(coordinates)}
						onClick={() => props.onNewCoordinates(coordinates)}
						ref={isSame ? currentBox : null}
						style={{
							left: Math.abs(minX) * WIDTH + coordinates[1] * WIDTH,
							top: Math.abs(minY) * HEIGHT + coordinates[2] * HEIGHT,
							width: WIDTH,
							height: HEIGHT,
						}}
						title={sublabel}
					>
						{coordinates[1]}, {coordinates[2]}
					</button>
				);
			})}
		</div>
	);
}
