// @flow strict

import {memo} from 'react';

import {useCurrentCoordinates} from '../../CurrentCoordinatesContext';
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

	return (
		<div className={styles.root}>
			<div>Level properties</div>

			<SidebarEditableProperties
				excludeProperties={['decos', 'geo', 'objects']}
				onLevelEditProperty={props.onLevelEditProperty}
				properties={props.level}
				schema={LEVEL_EDITABLE_PROPERTIES_SCHEMA}
			/>

			<div className={styles.actions}>
				<button onClick={onDeleteLevelButtonClick} type="button">
					Delete level
				</button>
			</div>
		</div>
	);
}

export default (memo<Props>(SidebarLevelProperties): React$AbstractComponent<
	Props,
	mixed
>);
