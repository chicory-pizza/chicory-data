// @flow strict

import type {LevelType} from './types/LevelType';

import isSameCoordinates from './util/isSameCoordinates';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from './util/convertLevelIdToCoordinates';
import GeoPreview, {GEO_WIDTH, GEO_HEIGHT} from './GeoPreview';
import React from 'react';
import {useEffect, useRef} from 'react';

import styles from './WorldMap.module.css';
import sortCompareCoordinates from './util/sortCompareCoordinates';

const WIDTH = GEO_WIDTH;
const HEIGHT = GEO_HEIGHT;

type Props = {
	currentCoordinates: [number, number, number],
	drawPreviews: boolean,
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
		.filter(Boolean)
		.sort((a, b) => {
			return sortCompareCoordinates(a, b);
		});

	useEffect(() => {
		currentBox.current?.scrollIntoView({
			block: 'center',
			inline: 'center',
		});
	}, [props.currentCoordinates]);

	return (
		<div
			className={
				styles.root + ' ' + (props.drawPreviews ? styles.drawPreviews : '')
			}
		>
			{levels.map((coordinates) => {
				const levelId = convertCoordinatesToLevelId(coordinates);
				const level = props.levels[levelId];

				const isSame = isSameCoordinates(props.currentCoordinates, coordinates);

				const sublabel = [
					level.name !== '' ? 'Name: ' + level.name : null,
					level.area !== '' ? 'Area: ' + level.area : null,
					level.palette !== '' ? 'Palette: ' + level.palette : null,
				];

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
						title={sublabel.filter(Boolean).join('\n')}
					>
						{props.drawPreviews ? (
							<div className={styles.canvas}>
								<GeoPreview
									level={level}
									mapMouseMoveCoordinates={null}
									scale={1}
								/>
							</div>
						) : null}

						<div
							className={styles.text}
							style={{
								width: WIDTH,
								height: HEIGHT,
							}}
						>
							{coordinates[1]}, {coordinates[2]}
						</div>
					</button>
				);
			})}
		</div>
	);
}
