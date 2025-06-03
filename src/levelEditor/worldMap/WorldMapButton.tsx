import {memo, useEffect, useRef, useState} from 'react';

import {GEO_HEIGHT, GEO_WIDTH} from '../GeoConstants';
import type {LevelType} from '../types/LevelType';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';

import getWorldMapGeoPreviewCache from './getWorldMapGeoPreviewCache';
import styles from './WorldMapButton.module.css';

const WIDTH = GEO_WIDTH;
const HEIGHT = GEO_HEIGHT;

type Props = Readonly<{
	isCurrent: boolean;
	level: LevelType | undefined;
	// optimization: we were repeatedly creating new arrays
	levelId: string;
	minX: number;
	minY: number;
	onSetNewCoordinates: (coordinates: [number, number, number]) => void;
}>;

function WorldMapButton(props: Props) {
	const coordinates = convertLevelIdToCoordinates(props.levelId);
	const level = props.level;
	const geo = level?.geo;
	const isCurrent = props.isCurrent;

	const [geoPreview, setGeoPreview] = useState<string | null>(null);
	const currentBox = useRef<HTMLButtonElement>(null);

	const sublabel =
		level != null
			? [
					level.name !== '' ? 'Name: ' + level.name : null,
					level.area !== '' ? 'Area: ' + level.area : null,
					level.palette !== '' ? 'Palette: ' + level.palette : null,
				]
			: [];

	useEffect(() => {
		if (isCurrent) {
			currentBox.current?.scrollIntoView({
				block: 'center',
				inline: 'center',
			});
		}
	}, [props.levelId, isCurrent]);

	useEffect(() => {
		if (!isCurrent && geo != null) {
			setGeoPreview(null);

			const handle = window.requestIdleCallback(() => {
				setGeoPreview(getWorldMapGeoPreviewCache(geo));
			});

			return () => {
				window.cancelIdleCallback(handle);
			};
		} else {
			setGeoPreview(null);

			return undefined;
		}
	}, [isCurrent, geo]);

	return (
		<button
			className={styles.box + ' ' + (isCurrent ? styles.currentBox : '')}
			data-testid={isCurrent ? 'worldmap-active' : null}
			onClick={() => props.onSetNewCoordinates(coordinates)}
			ref={isCurrent ? currentBox : null}
			style={{
				left: Math.abs(props.minX) * WIDTH + coordinates[1] * WIDTH,
				top: Math.abs(props.minY) * HEIGHT + coordinates[2] * HEIGHT,
				width: WIDTH,
				height: HEIGHT,
				backgroundImage: geoPreview != null ? `url(${geoPreview})` : '',
			}}
			title={sublabel.filter(Boolean).join('\n')}
			type="button"
		>
			<div className={styles.text}>
				{coordinates[1]}, {coordinates[2]}
			</div>
		</button>
	);
}

export default memo(WorldMapButton);
