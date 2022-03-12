// @flow strict

import {useEffect, useRef} from 'react';

import GeoPreview from './common/GeoPreview';
import {useCurrentCoordinates} from './CurrentCoordinatesContext';
import {GEO_HEIGHT, GEO_WIDTH} from './GeoConstants';
import type {LevelType} from './types/LevelType';
import convertCoordinatesToLevelId from './util/convertCoordinatesToLevelId';
import convertLevelIdToCoordinates from './util/convertLevelIdToCoordinates';
import isSameCoordinates from './util/isSameCoordinates';
import sortCompareCoordinates from './util/sortCompareCoordinates';
import {useWorldDataNonNullable} from './WorldDataContext';
import styles from './WorldMap.module.css';

const WIDTH = GEO_WIDTH;
const HEIGHT = GEO_HEIGHT;

type Props = $ReadOnly<{
	drawPreviews: boolean,
}>;

export default function WorldMap(props: Props): React$Node {
	const [worldData] = useWorldDataNonNullable();
	const [currentCoordinates, setNewCoordinates] = useCurrentCoordinates();

	const currentBox = useRef<?HTMLButtonElement>(null);

	let minX = 0;
	let minY = 0;

	const maybePlaceholderLevelId =
		convertCoordinatesToLevelId(currentCoordinates);
	const levels = Object.keys(worldData)
		.concat(
			worldData[maybePlaceholderLevelId] == null
				? [maybePlaceholderLevelId]
				: []
		)
		.map((levelId) => {
			const coordinates = convertLevelIdToCoordinates(levelId);

			// check layer
			if (coordinates[0] !== currentCoordinates[0]) {
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
	}, [currentCoordinates]);

	return (
		<div
			className={
				styles.root + ' ' + (props.drawPreviews ? styles.drawPreviews : '')
			}
		>
			{levels.map((coordinates) => {
				const levelId = convertCoordinatesToLevelId(coordinates);
				const level: ?LevelType = worldData[levelId];

				const isSame = isSameCoordinates(currentCoordinates, coordinates);

				const sublabel =
					level != null
						? [
								level.name !== '' ? 'Name: ' + level.name : null,
								level.area !== '' ? 'Area: ' + level.area : null,
								level.palette !== '' ? 'Palette: ' + level.palette : null,
						  ]
						: [];

				return (
					<button
						className={styles.box + ' ' + (isSame ? styles.currentBox : '')}
						data-testid={isSame ? 'worldmap-active' : null}
						// performance, try to recycle if possible
						key={coordinates[1] + '_' + coordinates[2]}
						onClick={() => setNewCoordinates(coordinates)}
						ref={isSame ? currentBox : null}
						style={{
							left: Math.abs(minX) * WIDTH + coordinates[1] * WIDTH,
							top: Math.abs(minY) * HEIGHT + coordinates[2] * HEIGHT,
							width: WIDTH,
							height: HEIGHT,
						}}
						title={sublabel.filter(Boolean).join('\n')}
						type="button"
					>
						{props.drawPreviews && level != null ? (
							<div className={styles.canvas}>
								<GeoPreview
									level={level}
									mapMouseMoveCoordinates={null}
									scale={1}
									useDevicePixelRatio={true}
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
