// @flow strict

import {memo} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import ObjCustomDogPreview from '../common/ObjCustomDogPreview';
import type {GameObjectType} from '../types/GameObjectType';

import styles from './LevelPreviewCustomDog.module.css';

export type Props = $ReadOnly<{
	obj: GameObjectType,
}>;

function LevelPreviewCustomDog(props: Props): React$MixedElement {
	const obj = props.obj;

	if (obj.obj !== 'objCustomDog') {
		return <></>;
	}

	return (
		<ErrorBoundary>
			<ObjCustomDogPreview canvasClassName={styles.dogPreview} obj={obj} />
		</ErrorBoundary>
	);
}

export default (memo(LevelPreviewCustomDog): React.AbstractComponent<
	React.ElementConfig<typeof LevelPreviewCustomDog>,
	mixed,
>);
