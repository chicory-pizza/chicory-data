// @flow strict

import {useState} from 'react';

import CustomModal from '../../common/CustomModal';
import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import convertCoordinatesToLevelId from '../util/convertCoordinatesToLevelId';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './EditRawLevelDataModal.module.css';

type Props = $ReadOnly<{
	isOpen: boolean,
	level: LevelType,
	onModalRequestClose: () => void,
}>;

export default function EditRawLevelDataModal(props: Props): React$Node {
	const {worldData, dispatch} = useWorldDataNonNullable();
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const [prevCoordinates, setPrevCoordinates] = useState(currentCoordinates);

	const [draftText, setDraftText] = useState(getLatestDataText());

	if (currentCoordinates !== prevCoordinates && props.isOpen) {
		setDraftText(getLatestDataText());
		setPrevCoordinates(currentCoordinates);
	}

	function getLatestDataText() {
		return JSON.stringify(
			worldData[convertCoordinatesToLevelId(currentCoordinates)],
			null,
			2
		);
	}

	function onFormSubmit(ev: SyntheticEvent<HTMLFormElement>) {
		ev.preventDefault();

		let level;
		try {
			level = JSON.parse(draftText);
		} catch (ex) {
			console.error(ex);
			alert('The level_data JSON is invalid.');
			return;
		}

		dispatch({
			type: 'setRawLevel',
			coordinates: currentCoordinates,
			level,
		});

		props.onModalRequestClose();
	}

	return (
		<CustomModal
			isOpen={props.isOpen}
			onRequestClose={props.onModalRequestClose}
			titleText={
				'Edit raw data for level ' +
				getLevelLabel(currentCoordinates, props.level)
			}
		>
			{props.isOpen ? (
				<>
					<form action="#" onSubmit={onFormSubmit}>
						<div>
							<textarea
								className={styles.textarea}
								data-testid="editrawleveldatamodal-textarea"
								onChange={(ev) => {
									setDraftText(ev.currentTarget.value);
								}}
								spellCheck={false}
								value={draftText}
							/>
						</div>

						<button
							className={styles.button}
							data-testid="editrawleveldatamodal-submit"
							type="submit"
						>
							Save
						</button>
					</form>
				</>
			) : null}
		</CustomModal>
	);
}
