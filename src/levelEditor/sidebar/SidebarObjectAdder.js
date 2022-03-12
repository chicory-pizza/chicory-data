// @flow strict

import {memo, useState} from 'react';

import CustomSelect from '../../common/CustomSelect';
import type {OptionType} from '../../common/CustomSelect';
import {
	GAME_OBJECT_ENTITIES,
	GAME_OBJECT_ENTITIES_ADVANCED,
	GAME_OBJECT_ENTITIES_CRASH,
} from '../types/GameObjectEntities';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';

import styles from './SidebarObjectAdder.module.css';

function gameObjectEntityTypeToOption(entity: GameObjectEntityType) {
	return {
		label: entity.slice('obj'.length),
		value: entity,
	};
}

type Props = $ReadOnly<{
	onAddingObjectEntity: (entity: GameObjectEntityType) => mixed,
}>;

function SidebarObjectAdder(props: Props): React$Node {
	const [selected, setSelected] = useState(null);

	const options: $ReadOnlyArray<{
		label: string,
		options: $ReadOnlyArray<OptionType<GameObjectEntityType>>,
	}> = [
		{
			label: 'Common',
			options: GAME_OBJECT_ENTITIES.map(gameObjectEntityTypeToOption),
		},
		{
			label: 'Added from game scripts',
			options: GAME_OBJECT_ENTITIES_ADVANCED.map(gameObjectEntityTypeToOption),
		},
		{
			label: 'Game crash',
			options: GAME_OBJECT_ENTITIES_CRASH.map(gameObjectEntityTypeToOption),
		},
	];

	return (
		<div className={styles.root}>
			Add object:
			<div className={styles.select}>
				<CustomSelect
					maxMenuHeight={300}
					onChange={(newOption) => {
						setSelected(newOption);
						props.onAddingObjectEntity(newOption.value);
					}}
					options={options}
					value={selected}
				/>
			</div>
			<button
				disabled={selected == null}
				onClick={() => {
					if (selected && selected.value) {
						props.onAddingObjectEntity(selected.value);
					}
				}}
				type="button"
			>
				Add
			</button>
		</div>
	);
}

export default (memo<Props>(SidebarObjectAdder): React$AbstractComponent<
	Props,
	mixed
>);
