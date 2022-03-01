// @flow strict

import {memo, useMemo, useState} from 'react';
// $FlowFixMe[untyped-import]
import Select from 'react-select';

import {GAME_OBJECT_ENTITIES} from '../types/GameObjectEntities';
import type {GameObjectEntityType} from '../types/GameObjectEntityType';

import styles from './SidebarObjectAdder.module.css';

type Props = $ReadOnly<{
	onAddingObjectEntity: (entity: GameObjectEntityType) => mixed,
}>;

function SidebarObjectAdder(props: Props): React$Node {
	const [selected, setSelected] = useState(null);

	const options = useMemo(() => {
		return GAME_OBJECT_ENTITIES.map((entity) => {
			return {
				value: entity,
				label: entity.slice('obj'.length),
			};
		});
	}, []);

	function addObject(option: {
		label: GameObjectEntityType,
		value: GameObjectEntityType,
	}) {
		setSelected(option);
		props.onAddingObjectEntity(option.value);
	}

	return (
		<div className={styles.root}>
			Add object:
			<div className={styles.select}>
				<Select
					maxMenuHeight={300}
					onChange={addObject}
					options={options}
					styles={{
						control: (provided, state) => {
							return {...provided, cursor: 'pointer'};
						},
						menu: (provided, state) => {
							return {...provided, zIndex: 99};
						},
					}}
					theme={(theme) => {
						return {
							...theme,
							colors: {
								...theme.colors,
								primary: '#c5aeff',
								primary25: '#ffb8a9',
							},
						};
					}}
					value={selected}
				/>
			</div>
			{/* <button onClick={addObject} disabled={selected == null} type="button">
				Add
			</button> */}
		</div>
	);
}

export default (memo<Props>(SidebarObjectAdder): React$AbstractComponent<
	Props,
	mixed
>);
