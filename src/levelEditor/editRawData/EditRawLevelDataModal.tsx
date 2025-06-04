import {Button, Modal} from '@mantine/core';
import {useState} from 'react';

import ErrorBoundary from '../../common/ErrorBoundary';
import {useCurrentCoordinatesNonNullable} from '../CurrentCoordinatesContext';
import type {LevelType} from '../types/LevelType';
import getLevelLabel from '../util/getLevelLabel';
import {useWorldDataNonNullable} from '../WorldDataContext';

import styles from './EditRawLevelDataModal.module.css';

type Props = Readonly<{
	isOpen: boolean;
	level: LevelType;
	onModalRequestClose: () => void;
}>;

export default function EditRawLevelDataModal(props: Props) {
	const {dispatch} = useWorldDataNonNullable();
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const [prevLevel, setPrevLevel] = useState(props.level);

	const [draftText, setDraftText] = useState(() => getLatestDataText());

	if (props.isOpen && props.level !== prevLevel) {
		setDraftText(getLatestDataText());
		setPrevLevel(props.level);
	}

	function getLatestDataText() {
		return JSON.stringify(props.level, null, 2);
	}

	function onFormSubmit(ev: React.SyntheticEvent<HTMLFormElement>) {
		ev.preventDefault();

		let level;
		try {
			// todo validate using Zod
			level = JSON.parse(draftText) as LevelType;
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
		<Modal
			onClose={props.onModalRequestClose}
			opened={props.isOpen}
			size="auto"
			title={
				'Edit raw data for level ' +
				getLevelLabel(currentCoordinates, props.level)
			}
		>
			<ErrorBoundary>
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

					<Button
						className={styles.button}
						data-testid="editrawleveldatamodal-submit"
						type="submit"
					>
						Save
					</Button>
				</form>
			</ErrorBoundary>
		</Modal>
	);
}
