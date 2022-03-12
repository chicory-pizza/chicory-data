// @flow strict

import {memo, useCallback, useState} from 'react';

import {useCurrentCoordinates} from '../../CurrentCoordinatesContext';
import DuplicateLevelModal from '../../duplicateLevel/DuplicateLevelModal';
import LevelTerrainEditorModal from '../../terrainEditor/LevelTerrainEditorModal';
import {LEVEL_EDITABLE_PROPERTIES_SCHEMA} from '../../types/LevelEditablePropertiesSchema';
import type {LevelType} from '../../types/LevelType';
import getLevelLabel from '../../util/getLevelLabel';
import {useWorldDataNonNullable} from '../../WorldDataContext';

import SidebarEditableProperties from './SidebarEditableProperties';
import styles from './SidebarLevelProperties.module.css';

const LEVEL_EXCLUDED_PROPERTIES = ['decos', 'geo', 'objects'];

type Props = $ReadOnly<{
	level: LevelType,
}>;

function SidebarLevelProperties(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();
	const [, dispatch] = useWorldDataNonNullable();

	const [isTerrainEditorModalOpen, setIsTerrainEditorModalOpen] =
		useState(false);
	const [isDuplicateLevelModalOpen, setIsDuplicateLevelModalOpen] =
		useState(false);

	const onEditProperty = useCallback(
		(key: string, value: string | number) => {
			dispatch({
				type: 'setLevelProperty',
				coordinates: currentCoordinates,
				key,
				value,
			});
		},
		[currentCoordinates, dispatch]
	);

	function onDeleteLevelButtonClick() {
		if (
			!window.confirm(
				`Are you sure you want to delete level ${getLevelLabel(
					currentCoordinates,
					props.level
				)}?`
			)
		) {
			return;
		}

		dispatch({
			type: 'deleteLevel',
			coordinates: currentCoordinates,
		});
	}

	return (
		<details className={styles.expander} open>
			<summary>
				Level {currentCoordinates[0]}, {currentCoordinates[1]},{' '}
				{currentCoordinates[2]} properties
			</summary>

			<div className={styles.content}>
				<SidebarEditableProperties
					excludeProperties={LEVEL_EXCLUDED_PROPERTIES}
					onEditProperty={onEditProperty}
					properties={props.level}
					schema={LEVEL_EDITABLE_PROPERTIES_SCHEMA}
				/>

				<button
					className={styles.actionButton}
					onClick={() => setIsTerrainEditorModalOpen(true)}
					type="button"
				>
					Edit terrain
				</button>

				<button
					className={styles.actionButton}
					onClick={() => setIsDuplicateLevelModalOpen(true)}
					type="button"
				>
					Duplicate level
				</button>

				<button
					className={styles.actionButton}
					onClick={onDeleteLevelButtonClick}
					type="button"
				>
					Delete level
				</button>
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
		</details>
	);
}

export default (memo<Props>(SidebarLevelProperties): React$AbstractComponent<
	Props,
	mixed
>);
