import {useIntersection} from '@mantine/hooks';
import {memo, useCallback, useEffect, useState} from 'react';
import {usePrevious} from 'react-use';

import {GEO_HEIGHT, GEO_WIDTH} from '../GeoConstants';
import type {LevelType} from '../types/LevelType';
import convertLevelIdToCoordinates from '../util/convertLevelIdToCoordinates';

import getWorldMapGeoPreviewCache from './getWorldMapGeoPreviewCache';
import styles from './WorldMapButton.module.css';

const WIDTH = GEO_WIDTH;
const HEIGHT = GEO_HEIGHT;

type Props = Readonly<{
	isCurrentScreen: boolean;
	level: LevelType | undefined;
	// optimization: we were repeatedly creating new arrays
	levelId: string;
	minX: number;
	minY: number;
	onSetNewCoordinates: (coordinates: [number, number, number]) => void;
}>;

function WorldMapButton(props: Props) {
	const {levelId: buttonLevelId, level, isCurrentScreen} = props;
	const coordinates = convertLevelIdToCoordinates(buttonLevelId);
	const geo = level?.geo;

	const [geoPreview, setGeoPreview] = useState<string | null>(null);
	const prevLevelId = usePrevious(buttonLevelId);
	const prevScreen = usePrevious(isCurrentScreen ? buttonLevelId : null);

	const {ref: intersectionObserverRef, entry} = useIntersection();

	const buttonRef = useCallback(
		(button: HTMLButtonElement | null) => {
			intersectionObserverRef(button);

			// Scroll to current box if the current editing level is different
			// either through map navigation or back/forward
			if (button && isCurrentScreen && buttonLevelId !== prevScreen) {
				button.scrollIntoView({
					block: 'center',
					inline: 'center',
				});
			}
		},
		[intersectionObserverRef, isCurrentScreen, prevScreen, buttonLevelId]
	);

	const showGeo = !isCurrentScreen && geo != null;
	if (!showGeo || buttonLevelId !== prevLevelId) {
		if (geoPreview != null) {
			setGeoPreview(null);
		}
	}

	useEffect(() => {
		if (showGeo && geo != null && geoPreview == null && entry?.isIntersecting) {
			const handle = window.requestIdleCallback(() => {
				setGeoPreview(getWorldMapGeoPreviewCache(geo));
			});

			return () => {
				window.cancelIdleCallback(handle);
			};
		}

		return;
	}, [entry?.isIntersecting, geo, geoPreview, showGeo]);

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
			className={styles.box + ' ' + (isCurrentScreen ? styles.currentBox : '')}
			data-testid={isCurrentScreen ? 'worldmap-active' : null}
			onClick={() => {
				props.onSetNewCoordinates(coordinates);
			}}
			ref={buttonRef}
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
