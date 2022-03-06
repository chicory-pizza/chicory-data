// @flow strict

import {memo, useState} from 'react';

import {useCurrentCoordinates} from '../../CurrentCoordinatesContext';
import LevelTerrainEditorModal from '../../terrainEditor/LevelTerrainEditorModal';
import {LEVEL_EDITABLE_PROPERTIES_SCHEMA} from '../../types/LevelEditablePropertiesSchema';
import type {LevelType} from '../../types/LevelType';

import SidebarEditableProperties from './SidebarEditableProperties';
import styles from './SidebarLevelProperties.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	onLevelDelete: () => mixed,
	onLevelEditProperty: (key: string, value: string | number) => mixed,
}>;

function SidebarLevelProperties(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();
	const [isTerrainEditorOpen, setIsTerrainEditorOpen] = useState(false);

	function onDeleteLevelButtonClick() {
		if (
			!window.confirm(
				`Are you sure you want to delete level ${currentCoordinates[0]}, ${currentCoordinates[1]}, ${currentCoordinates[2]}?`
			)
		) {
			return;
		}

		props.onLevelDelete();
	}

	function onNewGeoLoaded(geo: string) {
		props.onLevelEditProperty('geo', geo);
	}

	return (
		<div className={styles.root}>
			<div className={styles.heading}>
				Level {currentCoordinates[0]}, {currentCoordinates[1]},{' '}
				{currentCoordinates[2]} properties
			</div>

			<SidebarEditableProperties
				excludeProperties={['decos', 'geo', 'objects']}
				onEditProperty={props.onLevelEditProperty}
				properties={props.level}
				schema={LEVEL_EDITABLE_PROPERTIES_SCHEMA}
			/>

			<div className={styles.actions}>
				<button
					className={styles.rightPadding}
					onClick={() => setIsTerrainEditorOpen(true)}
					type="button"
				>
					Edit terrain
				</button>

				<button onClick={onDeleteLevelButtonClick} type="button">
					Delete level
				</button>
			</div>

			<LevelTerrainEditorModal
				isOpen={isTerrainEditorOpen}
				level={props.level}
				onRequestClose={() => setIsTerrainEditorOpen(false)}
				onNewGeoLoaded={onNewGeoLoaded}
			/>
		</div>
	);
}

export default (memo<Props>(SidebarLevelProperties): React$AbstractComponent<
	Props,
	mixed
>);
