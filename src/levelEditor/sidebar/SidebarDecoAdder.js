// @flow strict

import {memo, useState} from 'react';

import CustomSelect from '../../common/CustomSelect';
import type {PlaceableType} from '../types/PlaceableType';
import type {OptionType} from '../../common/CustomSelect';
import type {SpriteType} from '../types/SpriteType';

import styles from './SidebarObjectAdder.module.css';
import {SPRITES} from '../types/EntityCategories';
function gameObjectEntityTypeToOption(entity: SpriteType) {
	return {
		label: entity,
		value: entity,
	};
}

type Props = $ReadOnly<{
	onAddingEntityLabel: (entity: PlaceableType) => mixed,
}>;

function SidebarDecoAdder(props: Props): React$Node {
	const [selected, setSelected] = useState(null);

	const options: $ReadOnlyArray<{
		label: string,
		options: $ReadOnlyArray<OptionType<SpriteType>>,
	}> = [
		{
			label: 'Common',
			options: SPRITES.map(gameObjectEntityTypeToOption),
		},
	];

	return (
		<div className={styles.root}>
			<span className={styles.label}>Add decoration:</span>

			<div className={styles.select}>
				<CustomSelect
					maxMenuHeight={300}
					onChange={(newOption) => {
						setSelected(newOption);
						let temp = {
							type: 'DECO',
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
							type: 'DECO',
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

export default (memo<Props>(SidebarDecoAdder): React$AbstractComponent<
	Props,
	mixed
>);
