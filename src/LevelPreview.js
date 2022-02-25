// @flow strict

import type {LevelType} from './types/LevelType';

import React from 'react';
import {memo} from 'react';

import styles from './LevelPreview.module.css';

type Props = {
	level: LevelType,
	objectIndexHover: ?number,
	onMapMouseLeave: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseMove: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
};

function LevelPreview(props: Props): React$Node {
	return (
		<div
			className={styles.root}
			onMouseMove={props.onMapMouseMove}
			onMouseLeave={props.onMapMouseLeave}
		>
			{props.level.objects?.map((obj, index) => {
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
						{obj.obj.slice('obj'.length)}
					</div>
				);
			})}
		</div>
	);
}

export default (memo<Props>(LevelPreview): React$AbstractComponent<
	Props,
	mixed
>);
