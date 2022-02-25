// @flow strict

import type {LevelType} from './types/LevelType';

import LevelPreview from './LevelPreview';
import React from 'react';
import {useEffect, useState} from 'react';

import styles from './LevelInspector.module.css';

type Props = {
	level: LevelType,
};

export default function LevelInspector({level}: Props): React$Node {
	useEffect(() => {
		console.log(level);
	}, [level]);

	const [objectIndexHover, setObjectIndexHover] = useState<?number>(null);

	return (
		<div className={styles.root}>
			<div className={styles.preview}>
				<LevelPreview
					level={level}
					objectIndexHover={objectIndexHover}
					onObjectHover={setObjectIndexHover}
				/>
			</div>

			<div className={styles.sidebar}>
				{level.objects != null && objectIndexHover != null
					? JSON.stringify(level.objects[objectIndexHover])
					: null}
			</div>
		</div>
	);
}
