import {Button, Group} from '@mantine/core';
import {useState} from 'react';

import CustomSelect from '../../common/CustomSelect';
import type {OptionType} from '../../common/CustomSelect';

import styles from './SidebarEntityAdder.module.css';

type Props<EntityType, Data> = Readonly<{
	enabled: boolean;
	entityType: EntityType;
	nameLabel: string;
	onAddingEntityLabel: (entity: {type: EntityType; data: Data}) => void;
	options:
		| ReadonlyArray<OptionType<Data>>
		| ReadonlyArray<{
				label: string;
				options: ReadonlyArray<OptionType<Data>>;
		  }>;
}>;

export default function SidebarEntityAdder<EntityType, Data>(
	props: Props<EntityType, Data>
) {
	const [selected, setSelected] = useState<OptionType<Data> | null>(null);

	return (
		<Group gap="xs" wrap="nowrap">
			<span className={styles.label}>Add {props.nameLabel}:</span>

			<div className={styles.select}>
				<CustomSelect
					maxMenuHeight={300}
					onChange={(newOption: OptionType<Data> | null) => {
						setSelected(newOption);

						if (newOption && props.enabled) {
							props.onAddingEntityLabel({
								type: props.entityType,
								data: newOption.value,
							});
						}
					}}
					options={props.options}
					value={selected}
				/>
			</div>

			<Button
				className={styles.button}
				disabled={!props.enabled || selected == null}
				onClick={() => {
					if (selected && selected.value != null) {
						props.onAddingEntityLabel({
							type: props.entityType,
							data: selected.value,
						});
					}
				}}
				variant="default"
			>
				Add
			</Button>
		</Group>
	);
}
