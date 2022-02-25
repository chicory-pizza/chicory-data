// @flow strict

import React from 'react';

import styles from './SidebarMouseMoveCoordinates.module.css';

type Props = {
	mapMouseMoveCoordinates: ?[number, number],
};

export default function SidebarMouseMoveCoordinates(props: Props): React$Node {
	return (
		<div
			className={
				styles.root +
				' ' +
				(props.mapMouseMoveCoordinates == null ? styles.mouseHidden : '')
			}
		>
			Mouse:{' '}
			{props.mapMouseMoveCoordinates != null ? (
				<>
					{props.mapMouseMoveCoordinates[0]}, {props.mapMouseMoveCoordinates[1]}
				</>
			) : null}
		</div>
	);
}
