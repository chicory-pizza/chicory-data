import {memo} from 'react';

import type {OptionType} from '../../common/CustomSelect';
import {
	GAME_OBJECT_ENTITIES,
	GAME_OBJECT_ENTITIES_MODS,
	GAME_OBJECT_ENTITIES_ADVANCED,
	GAME_OBJECT_ENTITIES_CRASH,
} from '../types/GameObjectEntities';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';
import getGameObjectSimpleName from '../util/getGameObjectSimpleName';

import SidebarEntityAdder from './SidebarEntityAdder';

function gameObjectEntityTypeToOption(entity: GameObjectEntityType) {
	return {
		label: getGameObjectSimpleName(entity),
		value: entity,
	};
}

type Props = Readonly<{
	enabled: boolean;
	onAddingEntityLabel: (entity: {
		type: 'OBJECT';
		data: GameObjectEntityType;
	}) => void;
}>;

function SidebarObjectAdder(props: Props) {
	const options: ReadonlyArray<{
		label: string;
		options: ReadonlyArray<OptionType<GameObjectEntityType>>;
	}> = [
		{
			label: 'Common',
			options: GAME_OBJECT_ENTITIES.map(gameObjectEntityTypeToOption),
		},
		{
			label: 'Mods',
			options: GAME_OBJECT_ENTITIES_MODS.map(gameObjectEntityTypeToOption),
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
		<SidebarEntityAdder
			enabled={props.enabled}
			entityType="OBJECT"
			nameLabel="object"
			onAddingEntityLabel={props.onAddingEntityLabel}
			options={options}
		/>
	);
}

export default memo(SidebarObjectAdder);
