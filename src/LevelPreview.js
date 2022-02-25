// @flow strict

import type {LevelType} from './LevelType';

import React from 'react';

import styles from './LevelPreview.module.css';

type Props = {
	level: LevelType,
	objectIndexHover: ?number,
	onObjectHover: (objectIndex: ?number) => mixed,
};

export default function LevelPreview(props: Props): React$Node {
	return (
		<div className={styles.root}>
			{props.level.objects.map((obj, index) => {
				return (
					<div
						key={index}
						onMouseEnter={() => props.onObjectHover(index)}
						onMouseLeave={() => props.onObjectHover(null)}
						style={{
							position: 'absolute',
							top: obj.y,
							left: obj.x,
							background: props.objectIndexHover === index ? 'yellow' : null,
						}}
					>
						{obj.obj}
					</div>
				);
			})}
		</div>
	);
}
