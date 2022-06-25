// @flow strict

import {
	GEO_HEIGHT,
	GEO_WIDTH,
	SCREEN_HEIGHT,
	SCREEN_WIDTH,
} from '../GeoConstants';

import styles from './SidebarMouseMoveCoordinates.module.css';

type Props = $ReadOnly<{
	mapMouseMoveCoordinates: ?[number, number],
}>;

export default function SidebarMouseMoveCoordinates(props: Props): React$Node {
	if (props.mapMouseMoveCoordinates == null) {
		return <div className={styles.root + ' ' + styles.mouseHidden}>&nbsp;</div>;
	}

	const x = props.mapMouseMoveCoordinates[0];
	const y = props.mapMouseMoveCoordinates[1];

	return (
		<div className={styles.root}>
			Terrain: {Math.floor((x / SCREEN_WIDTH) * GEO_WIDTH)},{' '}
			{Math.floor((y / SCREEN_HEIGHT) * GEO_HEIGHT)} / Mouse: {x}, {y}
		</div>
	);
}
