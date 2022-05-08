// @flow strict

import {memo, useEffect, useRef} from 'react';

import CloseButton from '../../../common/CloseButton';
import usePrevious from '../../../util/usePrevious';
import type {DecorationType} from '../../types/DecorationType';
import type {GameEntityType} from '../../types/GameEntityType';
import type {GameObjectType} from '../../types/GameObjectType';
import {OBJECT_EDITABLE_PROPERTIES_SCHEMA} from '../../types/ObjectEditablePropertiesSchema';
import PropertyNumberInput from '../properties/PropertyNumberInput';
import SidebarEditableProperties from '../properties/SidebarEditableProperties';

import styles from './SidebarEntityItem.module.css';
import SidebarObjectText from './SidebarObjectText';

type Props = $ReadOnly<{
	expanded: boolean,
	highlighted: boolean,
	index: number,
	ent: DecorationType | GameObjectType,
	onItemToggle: (objectIndex: number) => mixed,
	onEntityDelete: (objectIndex: number) => mixed,
	onEntityEditProperty: (
		objectIndex: number,
		key: string,
		value: string | number
	) => mixed,
	onEntityHover: (objectIndex: ?number) => mixed,
	type: GameEntityType,
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
				styles.item +
				' ' +
				(props.highlighted
					? props.type === 'OBJECT'
						? styles.objHighlight
						: styles.decHighlight
					: '')
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

				<span className={styles.text}>
					{props.type === 'OBJECT' ? (
						<SidebarObjectText obj={props.ent} />
					) : (
						props.ent.spr
					)}
				</span>

				{props.highlighted ? (
					<CloseButton
						color="#000"
						label={
							'Delete ' +
							(props.type === 'OBJECT'
								? props.ent.obj.slice('obj'.length)
								: props.ent.spr)
						}
						onClick={() => props.onEntityDelete(props.index, props.type)}
						size=".6em"
					/>
				) : null}
			</div>

			{props.expanded ? (
				<div className={styles.editor}>
					<div className={styles.objectCoordinates}>
						<span className={styles.objectCoordinatesText}>X:</span>
						<PropertyNumberInput
							initialValue={props.ent.x}
							onCommitValue={(newValue: number | string) => {
								props.onEntityEditProperty(
									props.index,
									'x',
									newValue,
									props.type
								);
							}}
						/>

						<span className={styles.objectCoordinatesText}>Y:</span>
						<PropertyNumberInput
							initialValue={props.ent.y}
							onCommitValue={(newValue: number | string) => {
								props.onEntityEditProperty(
									props.index,
									'y',
									newValue,
									props.type
								);
							}}
						/>
					</div>
					{props.type === 'OBJECT' ? (
						<SidebarEditableProperties
							excludeProperties={['obj', 'x', 'y']}
							onEditProperty={(key: string, value: string | number) => {
								props.onEntityEditProperty(props.index, key, value);
							}}
							properties={props.ent}
							schema={
								OBJECT_EDITABLE_PROPERTIES_SCHEMA.get(props.ent.obj) ?? []
							}
						/>
					) : (
						<>
							<div className={styles.objectCoordinates}>
								<span className={styles.objectCoordinatesText}>XS:</span>
								<PropertyNumberInput
									initialValue={props.ent.xs}
									onCommitValue={(newValue: number | string) => {
										props.onEntityEditProperty(
											props.index,
											'xs',
											newValue,
											props.type
										);
									}}
									step={0.05}
								/>

								<span className={styles.objectCoordinatesText}>YS:</span>
								<PropertyNumberInput
									initialValue={props.ent.ys}
									onCommitValue={(newValue: number | string) => {
										props.onEntityEditProperty(
											props.index,
											'ys',
											newValue,
											props.type
										);
									}}
									step={0.05}
								/>
							</div>

							<div className={styles.objectCoordinatesText}>ang:</div>
							<PropertyNumberInput
								initialValue={props.ent.ang}
								onCommitValue={(newValue: number | string) => {
									props.onEntityEditProperty(
										props.index,
										'ang',
										newValue,
										props.type
									);
								}}
							/>
						</>
					)}
				</div>
			) : null}
		</li>
	);
}

export default (memo<Props>(SidebarEntityItem): React$AbstractComponent<
	Props,
	mixed
>);
