// @flow strict

import {memo} from 'react';

import {SPRITES} from '../types/SpriteEntities';
import type {SpriteType} from '../types/SpriteType';

import SidebarEntityAdder from './SidebarEntityAdder';

function decoTypeToOption(entity: SpriteType) {
	return {
		label: entity,
		value: entity,
	};
}

type Props = $ReadOnly<{
	onAddingEntityLabel: (entity: {
		type: 'DECO',
		data: SpriteType,
	}) => mixed,
}>;

function SidebarDecoAdder(props: Props): React$Node {
	return (
		<SidebarEntityAdder
			entityType="DECO"
			nameLabel="deco"
			onAddingEntityLabel={props.onAddingEntityLabel}
			options={SPRITES.map(decoTypeToOption)}
		/>
	);
}

export default (memo<Props>(SidebarDecoAdder): React$AbstractComponent<
	Props,
	mixed
>);
