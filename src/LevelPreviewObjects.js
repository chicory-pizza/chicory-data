// @flow strict

import {memo} from 'react';

import styles from './LevelPreviewObjects.module.css';
import type {LevelType} from './types/LevelType';

type Props = $ReadOnly<{
	level: LevelType,
	objectIndexHover: ?number,
	onMapMouseLeave: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onMapMouseMove: (ev: SyntheticMouseEvent<HTMLDivElement>) => mixed,
	onObjectHover: (objectIndex: ?number) => mixed,
}>;

function LevelPreviewObjects(props: Props): React$Node {
	const objects = props.level.objects;

	if (objects == null) {
		return null;
	}

	return objects.map((obj, index) => {
		return (
			<div
				className={
					styles.item +
					' ' +
					(props.objectIndexHover === index ? styles.itemHover : '')
				}
				key={index}
				onMouseEnter={() => props.onObjectHover(index)}
				onMouseLeave={() => props.onObjectHover(null)}
				style={{
					left: obj.x,
					top: obj.y,
				}}
			>
				{obj.obj.slice('obj'.length)}
			</div>
		);
	});
}

export default (memo<Props>(LevelPreviewObjects): React$AbstractComponent<
	Props,
	mixed
>);
