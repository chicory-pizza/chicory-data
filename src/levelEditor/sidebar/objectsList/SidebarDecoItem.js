// @flow strict

import {memo, useEffect, useRef} from 'react';

import CloseButton from '../../../common/CloseButton';
import usePrevious from '../../../util/usePrevious';
import type {GameObjectType} from '../../types/GameObjectType';
import type {DecorationType} from '../../types/DecorationType';

import {OBJECT_EDITABLE_PROPERTIES_SCHEMA} from '../../types/ObjectEditablePropertiesSchema';
import PropertyNumberInput from '../properties/PropertyNumberInput';
import SidebarEditableProperties from '../properties/SidebarEditableProperties';

import styles from './SidebarObjectsItem.module.css';
import SidebarObjectText from './SidebarObjectText';

type Props = $ReadOnly<{
	expanded: boolean,
	highlighted: boolean,
	index: number,
	dec: DecorationType,
	onItemToggle: (objectIndex: number) => mixed,
	onEntityDelete: (objectIndex: number) => mixed,
	onEntityEditProperty: (
		objectIndex: number,
		key: string,
		value: string | number
	) => mixed,
	onEntityHover: (objectIndex: ?number) => mixed,
}>;

function SidebarEntityItem(props: Props): React$Node {
	const item = useRef<?HTMLLIElement>(null);
	const previousExpanded = usePrevious(props.expanded);

	useEffect(() => {
		if (previousExpanded !== props.expanded && props.expanded) {
			item.current?.scrollIntoView({
				block: 'nearest',
			});
		}
	}, [previousExpanded, props.expanded]);

	return (
		<li
			className={
				styles.item + ' ' + (props.highlighted ? styles.highlight : '')
			}
			onMouseEnter={() => props.onEntityHover(props.index)}
			onMouseLeave={() => props.onEntityHover(null)}
			ref={item}
		>
			{/* Flexbox doesn't work well in <details><summary> :( */}
			<div className={styles.title}>
				<button
					className={styles.toggleIcon}
					onFocus={() => props.onEntityHover(props.index)}
					onClick={() => props.onItemToggle(props.index)}
					title={props.expanded ? 'Collapse details' : 'Expand details'}
					type="button"
				>
					{props.expanded ? '▼' : '▶︎'}
				</button>

				<span className={styles.text}>{props.dec.spr}</span>

				{props.highlighted ? (
					<CloseButton
						color="#000"
						label={'Delete ' + props.dec.spr}
						onClick={() => props.onEntityDelete(props.index, 'DECO')}
						size=".6em"
					/>
				) : null}
			</div>

			{props.expanded ? (
				<div className={styles.editor}>
					<div className={styles.objectCoordinates}>
						<span className={styles.objectCoordinatesText}>X:</span>
						<PropertyNumberInput
							initialValue={props.dec.x}
							onCommitValue={(newValue: number | string) => {
								props.onEntityEditProperty(props.index, 'x', newValue, 'DECO');
							}}
						/>

						<span className={styles.objectCoordinatesText}>Y:</span>
						<PropertyNumberInput
							initialValue={props.dec.y}
							onCommitValue={(newValue: number | string) => {
								props.onEntityEditProperty(props.index, 'y', newValue, 'DECO');
							}}
						/>
					</div>
					<div className={styles.objectCoordinates}>
						<span className={styles.objectCoordinatesText}>XS:</span>
						<PropertyNumberInput
							initialValue={props.dec.xs}
							onCommitValue={(newValue: number | string) => {
								props.onEntityEditProperty(props.index, 'xs', newValue, 'DECO');
							}}
							step={0.05}
						/>

						<span className={styles.objectCoordinatesText}>YS:</span>
						<PropertyNumberInput
							initialValue={props.dec.ys}
							onCommitValue={(newValue: number | string) => {
								props.onEntityEditProperty(props.index, 'ys', newValue, 'DECO');
							}}
							step={0.05}
						/>
					</div>

					<span className={styles.objectCoordinatesText}>ang:</span>
					<PropertyNumberInput
						initialValue={props.dec.ang}
						onCommitValue={(newValue: number | string) => {
							props.onEntityEditProperty(props.index, 'ang', newValue, 'DECO');
						}}
					/>
				</div>
			) : null}
		</li>
	);
}

export default (memo<Props>(SidebarEntityItem): React$AbstractComponent<
	Props,
	mixed
>);
