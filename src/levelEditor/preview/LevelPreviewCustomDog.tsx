import {memo} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import ObjCustomDogPreview from '../common/ObjCustomDogPreview';
import type {ObjCustomDogType} from '../types/GameObjectType';

import styles from './LevelPreviewCustomDog.module.css';

type Props = Readonly<{
	obj: ObjCustomDogType;
}>;

function LevelPreviewCustomDog(props: Props) {
	const obj = props.obj;

	return (
		<ErrorBoundary>
			<ObjCustomDogPreview canvasClassName={styles.dogPreview} obj={obj} />
		</ErrorBoundary>
	);
}

export default memo(LevelPreviewCustomDog);
