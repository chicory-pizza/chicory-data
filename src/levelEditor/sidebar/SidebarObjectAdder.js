// @flow strict

import {memo, useState} from 'react';

import CustomSelect from '../../common/CustomSelect';
import {GAME_OBJECT_ENTITIES} from '../types/GameObjectEntities';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';

import styles from './SidebarObjectAdder.module.css';

type Props = $ReadOnly<{
	onAddingObjectEntity: (entity: GameObjectEntityType) => mixed,
}>;

function SidebarObjectAdder(props: Props): React$Node {
	const [selected, setSelected] = useState(null);

	const options = GAME_OBJECT_ENTITIES.map((entity) => {
		return {
			value: entity,
			label: entity.slice('obj'.length),
		};
	});

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
