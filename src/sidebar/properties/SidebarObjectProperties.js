// @flow strict

import {memo} from 'react';

import {useCurrentCoordinates} from '../../CurrentCoordinatesContext';
import {LEVEL_EDITABLE_PROPERTIES_SCHEMA} from '../../types/LevelEditablePropertiesSchema';
import type {LevelType} from '../../types/LevelType';

import SidebarEditableProperties from './SidebarEditableProperties';
import styles from './SidebarObjectProperties.module.css';

type Props = $ReadOnly<{
	level: LevelType,
	objectIndexHover: ?number,
	onLevelDelete: () => mixed,
	onLevelEditProperty: (key: string, value: string | number) => mixed,
}>;

function SidebarObjectProperties(props: Props): React$Node {
	const [currentCoordinates] = useCurrentCoordinates();

	const levelObjects = props.level.objects;

	const currentObject =
		levelObjects != null && props.objectIndexHover != null
			? levelObjects[props.objectIndexHover]
			: null;

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
			{currentObject ? (
				<>
					<div>{currentObject.obj} properties</div>

					<pre>
						<code>{JSON.stringify(currentObject, null, 2)}</code>
					</pre>
				</>
			) : (
				<>
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
				</>
			)}
		</div>
	);
}

export default (memo<Props>(SidebarObjectProperties): React$AbstractComponent<
	Props,
	mixed
>);
