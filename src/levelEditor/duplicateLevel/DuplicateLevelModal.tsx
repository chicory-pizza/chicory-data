import {Button, Group, Modal} from '@mantine/core';
import {useState} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import MessageBox from '../../common/MessageBox';
import LevelLayerNumberInputs from '../common/LevelLayerNumberInputs';
import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import convertNullableCoordinatesToNonNull from '../util/convertNullableCoordinatesToNonNull';
import getLevelLabel from '../util/getLevelLabel';
import isSameCoordinates from '../util/isSameCoordinates';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './DuplicateLevelModal.module.css';

type Props = Readonly<{
	isOpen: boolean;
	level: LevelType;
	onModalRequestClose: () => void;
}>;

export default function DuplicateLevelModal(props: Props) {
	const {worldData, dispatch} = useWorldDataNonNullable();
	const [currentCoordinates, setNewCoordinates] =
		useCurrentCoordinatesNonNullable();

	const [draftCoordinates, setDraftCoordinates] = useState<
		[number | null, number | null, number | null]
	>([currentCoordinates[0], currentCoordinates[1], currentCoordinates[2]]);
	const [prevCoordinates, setPrevCoordinates] = useState(currentCoordinates);

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	if (currentCoordinates !== prevCoordinates) {
		setDraftCoordinates([
			currentCoordinates[0],
			currentCoordinates[1],
			currentCoordinates[2],
		]);
		setPrevCoordinates(currentCoordinates);
	}

	const draftCoordinatesNonNull =
		convertNullableCoordinatesToNonNull(draftCoordinates);
	const goingToOverwriteExisting =
		draftCoordinatesNonNull != null &&
		!isSameCoordinates(currentCoordinates, draftCoordinatesNonNull) &&
		worldData[convertCoordinatesToLevelId(draftCoordinatesNonNull)] != null;

	function onFormSubmit(ev: React.SyntheticEvent<HTMLFormElement>) {
		ev.preventDefault();

		setErrorMessage(null);

		const newCoordinates =
			convertNullableCoordinatesToNonNull(draftCoordinates);
		if (newCoordinates == null) {
			setErrorMessage('Please enter the coordinates');
			return;
		}

		if (
			newCoordinates[0] === currentCoordinates[0] &&
			newCoordinates[1] === currentCoordinates[1] &&
			newCoordinates[2] === currentCoordinates[2]
		) {
			setErrorMessage(
				"Silly wielder, there's no reason to duplicate the level to the same coordinates"
			);
			return;
		}

		dispatch({
			type: 'duplicateLevel',
			from: currentCoordinates,
			to: newCoordinates,
		});

		setNewCoordinates(newCoordinates);

		props.onModalRequestClose();
	}

	return (
		<Modal
			onClose={props.onModalRequestClose}
			opened={props.isOpen}
			title={
				'Duplicate level ' + getLevelLabel(currentCoordinates, props.level)
			}
		>
			<ErrorBoundary>
				<p className={styles.explanation}>
					Enter the new coordinates to copy to:
				</p>

				<form action="#" onSubmit={onFormSubmit}>
					<div>
						<LevelLayerNumberInputs
							coordinates={draftCoordinates}
							onNewCoordinatesSet={(newCoordinates) => {
								setDraftCoordinates(newCoordinates);
								setErrorMessage(null);
							}}
							testIdPrefix="duplicatelevelmodal"
						/>
					</div>

					<Group justify="flex-end" mt="md">
						<Button
							className={styles.button}
							data-testid="duplicatelevelmodal-submit"
							type="submit"
						>
							Duplicate
						</Button>
					</Group>
				</form>

				{goingToOverwriteExisting ? (
					<div className={styles.overwriteExistingMessage}>
						<MessageBox
							message="You are about to overwrite an existing level"
							type="INFO"
						/>
					</div>
				) : null}

				{errorMessage != null ? (
					<div className={styles.errorMessage}>
						<MessageBox message={errorMessage} type="ERROR" />
					</div>
				) : null}
			</ErrorBoundary>
		</Modal>
	);
}
