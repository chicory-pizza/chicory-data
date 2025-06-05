import {Button, Group} from '@mantine/core';
import {modals} from '@mantine/modals';
import {memo, useCallback, useState} from 'react';

import {useCurrentCoordinatesNonNullable} from '../../CurrentCoordinatesContext';
import DuplicateLevelModal from '../../duplicateLevel/DuplicateLevelModal';
import EditRawLevelDataModal from '../../editRawData/EditRawLevelDataModal';
import LevelTerrainEditorModal from '../../terrainEditor/LevelTerrainEditorModal';
import {LEVEL_EDITABLE_PROPERTIES_SCHEMA} from '../../types/LevelEditablePropertiesSchema';
import {isValidLevelTypeKey, type LevelType} from '../../types/LevelType';
import type {SidebarPanel} from '../../types/SidebarPanel';
import convertCoordinatesToLevelId from '../../util/convertCoordinatesToLevelId';
import getLevelLabel from '../../util/getLevelLabel';
import {useWorldDataNonNullable} from '../../WorldDataContext';

import SidebarEditableProperties from './SidebarEditableProperties';
import styles from './SidebarLevelProperties.module.css';

const LEVEL_EXCLUDED_PROPERTIES = ['decos', 'geo', 'objects'];

type Props = Readonly<{
	expanded: boolean;
	level: LevelType;
	onSidebarPanelExpandToggle: (
		ev: React.MouseEvent<HTMLElement>,
		sidebarPanel: SidebarPanel
	) => void;
}>;

function SidebarLevelProperties(props: Props) {
	const [currentCoordinates] = useCurrentCoordinatesNonNullable();
	const {dispatch} = useWorldDataNonNullable();

	const [isTerrainEditorModalOpen, setIsTerrainEditorModalOpen] =
		useState(false);
	const [isDuplicateLevelModalOpen, setIsDuplicateLevelModalOpen] =
		useState(false);
	const [isEditRawDataModalOpen, setIsEditRawDataModalOpen] = useState(false);

	const onEditProperty = useCallback(
		(key: string, value: string | number | null) => {
			if (isValidLevelTypeKey(key)) {
				dispatch({
					type: 'setLevelProperty',
					coordinates: currentCoordinates,
					key,
					value,
				});
			}
		},
		[currentCoordinates, dispatch]
	);

	async function onRestoreGameDefaultButtonClick() {
		let initialWorldData;
		try {
			initialWorldData = await import('../../level_data.json');
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
			initialWorldData.default[convertCoordinatesToLevelId(currentCoordinates)];

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
	}

	function onDeleteLevelButtonClick() {
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
	}

	return (
		<details className={styles.expander} open={props.expanded}>
			<summary
				onClick={(ev) =>
					props.onSidebarPanelExpandToggle(ev, 'LEVEL_PROPERTIES')
				}
			>
				Level {currentCoordinates.join(', ')} properties
			</summary>

			<div className={styles.content}>
				<SidebarEditableProperties
					excludeProperties={LEVEL_EXCLUDED_PROPERTIES}
					onEditProperty={onEditProperty}
					properties={props.level}
					schema={LEVEL_EDITABLE_PROPERTIES_SCHEMA}
					testIdPrefix="sidebarlevelproperties"
				/>

				<Group gap="xs" className={styles.buttonGroup}>
					<Button
						className={styles.actionButton}
						onClick={() => setIsTerrainEditorModalOpen(true)}
						variant="default"
					>
						Edit terrain
					</Button>

					<Button
						className={styles.actionButton}
						onClick={() => setIsDuplicateLevelModalOpen(true)}
						variant="default"
					>
						Duplicate level
					</Button>

					<Button
						className={styles.actionButton}
						onClick={() => setIsEditRawDataModalOpen(true)}
						variant="default"
					>
						Edit raw data
					</Button>

					<Button
						className={styles.actionButton}
						onClick={onRestoreGameDefaultButtonClick}
						variant="default"
					>
						Restore game default
					</Button>

					<Button
						className={styles.actionButton}
						onClick={onDeleteLevelButtonClick}
						variant="default"
					>
						Delete level
					</Button>
				</Group>
			</div>

			<LevelTerrainEditorModal
				isOpen={isTerrainEditorModalOpen}
				level={props.level}
				onModalRequestClose={() => setIsTerrainEditorModalOpen(false)}
			/>

			<DuplicateLevelModal
				isOpen={isDuplicateLevelModalOpen}
				level={props.level}
				onModalRequestClose={() => setIsDuplicateLevelModalOpen(false)}
			/>

			<EditRawLevelDataModal
				isOpen={isEditRawDataModalOpen}
				level={props.level}
				onModalRequestClose={() => setIsEditRawDataModalOpen(false)}
			/>
		</details>
	);
}

export default memo(SidebarLevelProperties);
