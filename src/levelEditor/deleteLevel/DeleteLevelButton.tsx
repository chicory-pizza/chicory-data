import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useCallback} from 'react';

import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

type Props = Readonly<{
	level: LevelType;
}>;

export default function DeleteLevelButton(props: Props) {
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const {dispatch} = useWorldDataNonNullable();

	const onDeleteLevelButtonClick = useCallback(() => {
		modals.openConfirmModal({
			title: `Delete level ${getLevelLabel(currentCoordinates, props.level)}?`,
			labels: {confirm: 'Delete', cancel: 'Cancel'},
			onConfirm() {
				dispatch({
					type: 'deleteLevel',
					coordinates: currentCoordinates,
				});
			},
		});
	}, [currentCoordinates, dispatch, props.level]);

	return (
		<Button onClick={onDeleteLevelButtonClick} variant="default">
			Delete level
		</Button>
	);
}
