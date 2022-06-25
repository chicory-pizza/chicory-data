// @flow strict

import {useState} from 'react';

import CustomSelect from '../../common/CustomSelect';
import type {OptionType} from '../../common/CustomSelect';

import styles from './SidebarEntityAdder.module.css';

type Props<EntityType, Data> = $ReadOnly<{
	entityType: EntityType,
	nameLabel: string,
	onAddingEntityLabel: (entity: {
		type: EntityType,
		data: Data,
	}) => mixed,
	options:
		| $ReadOnlyArray<OptionType<Data>>
		| $ReadOnlyArray<{
				label: string,
				options: $ReadOnlyArray<OptionType<Data>>,
		  }>,
}>;

export default function SidebarEntityAdder<EntityType, Data>(
	props: Props<EntityType, Data>
): React$Node {
	const [selected, setSelected] = useState(null);

	return (
		<div className={styles.root}>
			<span className={styles.label}>Add {props.nameLabel}:</span>

			<div className={styles.select}>
				<CustomSelect
					maxMenuHeight={300}
					onChange={(newOption) => {
						setSelected(newOption);
						props.onAddingEntityLabel({
							type: props.entityType,
							data: newOption.value,
						});
					}}
					options={props.options}
					value={selected}
				/>
			</div>

			<button
				className={styles.button}
				disabled={selected == null}
				onClick={() => {
					if (selected && selected.value != null) {
						props.onAddingEntityLabel({
							type: props.entityType,
							data: selected.value,
						});
					}
				}}
				type="button"
			>
				Add
			</button>
		</div>
	);
}
