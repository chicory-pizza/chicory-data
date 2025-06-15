import {Button, Group} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {memo, useCallback} from 'react';

import {useCurrentCoordinatesNonNullable} from '../../CurrentCoordinatesContext';
import DeleteLevelButton from '../../deleteLevel/DeleteLevelButton';
import DuplicateLevelModal from '../../duplicateLevel/DuplicateLevelModal';
import EditRawLevelDataModal from '../../editRawData/EditRawLevelDataModal';
import RestoreGameDefaultLevelButton from '../../restoreGameDefault/RestoreGameDefaultLevelButton';
import LevelTerrainEditorModal from '../../terrainEditor/LevelTerrainEditorModal';
import {LEVEL_EDITABLE_PROPERTIES_SCHEMA} from '../../types/LevelEditablePropertiesSchema';
import {isValidLevelTypeKey, type LevelType} from '../../types/LevelType';
import type {SidebarPanel} from '../../types/SidebarPanel';
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

	const [
		isTerrainEditorModalOpen,
		{open: openTerrainEditorModal, close: closeTerrainEditorModal},
	] = useDisclosure(false);
	const [
		isDuplicateLevelModalOpen,
		{open: openDuplicateLevelModal, close: closeDuplicateLevelModal},
	] = useDisclosure(false);
	const [
		isEditRawDataModalOpen,
		{open: openEditRawDataModal, close: closeEditRawDataModal},
	] = useDisclosure(false);

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
					<Button onClick={openTerrainEditorModal} variant="default">
						Edit terrain
					</Button>

					<Button onClick={openDuplicateLevelModal} variant="default">
						Duplicate level
					</Button>

					<Button onClick={openEditRawDataModal} variant="default">
						Edit raw data
					</Button>

					<RestoreGameDefaultLevelButton />

					<DeleteLevelButton level={props.level} />
				</Group>
			</div>

			<LevelTerrainEditorModal
				isOpen={isTerrainEditorModalOpen}
				level={props.level}
				onModalRequestClose={closeTerrainEditorModal}
			/>

			<DuplicateLevelModal
				isOpen={isDuplicateLevelModalOpen}
				level={props.level}
				onModalRequestClose={closeDuplicateLevelModal}
			/>

			<EditRawLevelDataModal
				isOpen={isEditRawDataModalOpen}
				level={props.level}
				onModalRequestClose={closeEditRawDataModal}
			/>
		</details>
	);
}

export default memo(SidebarLevelProperties);
