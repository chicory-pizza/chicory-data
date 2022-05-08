// @flow strict

import {memo, useState} from 'react';

import CustomSelect from '../../common/CustomSelect';
import type {OptionType} from '../../common/CustomSelect';
import {
	GAME_OBJECT_ENTITIES,
	GAME_OBJECT_ENTITIES_ADVANCED,
	GAME_OBJECT_ENTITIES_CRASH,
	SPRITES,
} from '../types/EntityCategories';
import type {GameEntityType} from '../types/GameEntityType';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';
import type {PlaceableType} from '../types/PlaceableType';
import type {SpriteType} from '../types/SpriteType';

import styles from './SidebarEntityAdder.module.css';

function gameObjectEntityTypeToOption(entity: GameObjectEntityType) {
	return {
		label: entity.slice('obj'.length),
		value: entity,
	};
}

function decoTypeToOption(entity: GameObjectEntityType) {
	return {
		label: entity,
		value: entity,
	};
}

type Props = $ReadOnly<{
	onAddingEntityLabel: (entity: PlaceableType) => mixed,
	type: GameEntityType,
}>;

function SidebarEntityAdder(props: Props): React$Node {
	const [selected, setSelected] = useState(null);

	const optionsObj: $ReadOnlyArray<{
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

	const optionsDeco: $ReadOnlyArray<{
		label: string,
		options: $ReadOnlyArray<OptionType<SpriteType>>,
	}> = [
		{
			label: 'Common',
			options: SPRITES.map(decoTypeToOption),
		},
	];

	return (
		<div className={styles.root}>
			<span className={styles.label}>Add {props.type.toLowerCase()}:</span>

			<div className={styles.select}>
				<CustomSelect
					maxMenuHeight={300}
					onChange={(newOption) => {
						setSelected(newOption);
						let entityToAdd = {
							type: props.type,
							data: newOption.value,
						};
						props.onAddingEntityLabel(entityToAdd);
					}}
					options={props.type === 'OBJECT' ? optionsObj : optionsDeco}
					value={selected}
				/>
			</div>

			<button
				className={styles.button}
				disabled={selected == null}
				onClick={() => {
					if (selected && selected.value) {
						let entityToAdd = {
							type: props.type,
							data: selected.value,
						};
						props.onAddingEntityLabel(entityToAdd);
					}
				}}
				type="button"
			>
				Add
			</button>
		</div>
	);
}

export default (memo<Props>(SidebarEntityAdder): React$AbstractComponent<
	Props,
	mixed
>);
