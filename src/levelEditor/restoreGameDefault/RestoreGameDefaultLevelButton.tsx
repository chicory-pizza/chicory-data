import {Button} from '@mantine/core';
import {modals} from '@mantine/modals';
import {useCallback} from 'react';

import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import {useWorldDataNonNullable} from '../WorldDataContext';

export default function RestoreGameDefaultLevelButton() {
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const {dispatch} = useWorldDataNonNullable();

	const onRestoreGameDefaultButtonClick = useCallback(async () => {
		let initialWorldData;
		try {
			initialWorldData = await import('../level_data.json');
		} catch (ex) {
			console.error(ex);
			modals.openContextModal({
				modal: 'alert',
				title: 'Error',
				innerProps: {
					content: 'There was a problem loading the original level data.',
				},
			});
			return;
		}

		const level =
			// @ts-expect-error todo validate properly
			initialWorldData.default[
				convertCoordinatesToLevelId(currentCoordinates)
			] as LevelType | null;

		if (level == null) {
			modals.openContextModal({
				modal: 'alert',
				title: 'Restore game default',
				innerProps: {
					content:
						"This level is not in the original game, you can delete the level if you don't want it.",
				},
			});
			return;
		}

		modals.openConfirmModal({
			title: `Restore level ${currentCoordinates.join(', ')} to the game default?`,
			labels: {confirm: 'Restore', cancel: 'Cancel'},
			confirmProps: {'data-autofocus': 'true'},
			onConfirm() {
				dispatch({
					type: 'setRawLevel',
					coordinates: currentCoordinates,
					level,
				});
			},
		});
	}, [currentCoordinates, dispatch]);

	return (
		<Button onClick={onRestoreGameDefaultButtonClick} variant="default">
			Restore game default
		</Button>
	);
}
