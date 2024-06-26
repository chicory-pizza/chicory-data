// @flow strict

import {useState} from 'react';

import CustomModal from '../../common/CustomModal';
import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './EditRawLevelDataModal.module.css';

type Props = $ReadOnly<{
	isOpen: boolean,
	level: LevelType,
	onModalRequestClose: () => void,
}>;

export default function EditRawLevelDataModal(props: Props): React$Node {
	const {dispatch} = useWorldDataNonNullable();
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const [prevLevel, setPrevLevel] = useState(props.level);

	const [draftText, setDraftText] = useState(getLatestDataText());

	if (props.isOpen && props.level !== prevLevel) {
		setDraftText(getLatestDataText());
		setPrevLevel(props.level);
	}

	function getLatestDataText() {
		return JSON.stringify(props.level, null, 2);
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

		setPrevLevel(level);

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
