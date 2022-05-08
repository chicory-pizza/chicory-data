// @flow strict

import {memo, useState} from 'react';

import CustomSelect from '../../common/CustomSelect';
import type {OptionType} from '../../common/CustomSelect';
import {
	GAME_OBJECT_ENTITIES,
	GAME_OBJECT_ENTITIES_ADVANCED,
	GAME_OBJECT_ENTITIES_CRASH,
} from '../types/EntityCategories';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';
import type {PlaceableType} from '../types/PlaceableType';

import styles from './SidebarObjectAdder.module.css';

function gameObjectEntityTypeToOption(entity: GameObjectEntityType) {
	return {
		label: entity.slice('obj'.length),
		value: entity,
	};
}

type Props = $ReadOnly<{
	onAddingEntityLabel: (entity: PlaceableType) => mixed,
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
			<span className={styles.label}>Add object:</span>

			<div className={styles.select}>
				<CustomSelect
					maxMenuHeight={300}
					onChange={(newOption) => {
						setSelected(newOption);
						let temp = {
							type: 'OBJECT',
							data: newOption.value,
						};
						props.onAddingEntityLabel(temp);
					}}
					options={options}
					value={selected}
				/>
			</div>

			<button
				className={styles.button}
				disabled={selected == null}
				onClick={() => {
					if (selected && selected.value) {
						let temp = {
							type: 'OBJECT',
							data: selected.value,
						};
						props.onAddingEntityLabel(temp);
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
